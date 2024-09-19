import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    PixelRatio,
    
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

// Importamos el controlador para obtener los proyectos
import InitialPage_Ctrl from "../controllers/InitialPageController";

import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";

// Método de navegación
import { useNavigation } from '@react-navigation/native';

const ProjectsManagement = ({ route }) => {
    const { usuarioActual } = route.params;
    
    const [dropdownVisible, setDropdownVisible] = useState(false);


    const [proyectosActivos, setProyectosActivos] = useState([]);
    const [error, setError] = useState(null);

    // Función para obtener los proyectos activos
    const obtenerProyectosActivos = async () => {
        const controlador = new InitialPage_Ctrl(usuarioActual);
        try {
            const proyectos = await controlador.getTodosLosProyectos();
            setProyectosActivos(proyectos);
        } catch (err) {
            console.error("Error obteniendo los proyectos activos: ", err);
            setError("Hubo un problema al obtener los proyectos activos.");
        }
    };

    useEffect(() => {
        obtenerProyectosActivos();
    }, []);

    const navigation = useNavigation();

    // Función para manejar el clic en un proyecto
    const handleVerDetallesProyecto = (proyecto) => {
        navigation.navigate('Detalle Proyecto', { proyecto });
    };

    return (
        <View style={styles.fullPage}>
            <UpTab
                usuarioActual={usuarioActual}
                dropdownVisible={dropdownVisible}
                setDropdownVisible={setDropdownVisible}
            /> 
            <View style={styles.container}>
                <Text style={styles.title}>Gestión de Proyectos</Text>

                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <ScrollView keyboardShouldPersistTaps={"handled"}>
                        {proyectosActivos.length > 0 ? (
                            proyectosActivos.map((proyecto, index) => (
                                <View key={index} style={styles.proyectoContainer}>
                                    <ScrollView horizontal={true} style={styles.mediaPreviewContainer}>
                                        {proyecto.media && proyecto.media.length > 0 && proyecto.media.map((mediaItem, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: mediaItem }}
                                                style={styles.preview}
                                            />
                                        ))}
                                    </ScrollView>

                                    <View style={styles.columnProyect}>
                                        <Text style={styles.titleProyect}>{proyecto.nombre}</Text>

                                        {/* Añadimos esta sección para el nombre del creador y días restantes */}
                                        <Text style={styles.creadorProyecto}>
                                            {proyecto.creadorNombre}
                                        </Text>

                                        {proyecto.estado_proyecto ? (
                                            <Text style={styles.diasRestantes}>
                                                {proyecto.diasRestantes} días restantes   {proyecto.porcentajeFondos}% recaudado
                                            </Text>
                                        ) : (
                                            <Text style={styles.diasRestantes}>
                                                Aún por iniciar   {proyecto.porcentajeFondos}% recaudado
                                            </Text>
                                        )}
                                    </View>

                                    <Text style={styles.descriptionProyect} selectable={true}>
                                        {proyecto.descripcion}
                                    </Text>

                                    <Text style={styles.categoriaButton}>{proyecto.categoria}</Text>

                                    <View style={styles.actionButtonsContainer}>
                                        <TouchableOpacity style={styles.editButton} onPress={() => handleVerDetallesProyecto(proyecto)}>
                                            <Text style={styles.editButtonText}>Editar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteButton}>
                                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyText}>No hay proyectos activos actualmente.</Text>
                        )}
                    </ScrollView>
                )}
            </View>
            <DownTab
                usuarioActual={usuarioActual}
                paginaActual={""}
            />
        </View>
    );
};

// Estilos y configuraciones de dimensiones
const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    fullPage: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    container: {
        flex: 1,
        padding: normalize(20),
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: normalize(24),
        fontWeight: 'bold',
        color: '#454986',
        marginBottom: normalize(20),
        marginTop: normalize(10),
        textAlign: 'center',
    },
    proyectoContainer: {
        backgroundColor: '#ECF7FD',
        borderRadius: normalize(10),
        padding: normalize(15),
        marginBottom: normalize(15),
    },
    columnProyect: {
        marginLeft: 10,
    },
    titleProyect: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#0B3979',
    },
    creadorProyecto: {
        fontSize: normalize(14),  // Ajusta el tamaño del texto según el diseño
        color: '#707070',  // Color de texto
        marginTop: 4,      // Espacio entre el título y el nombre
    },
    diasRestantes: {
        fontSize: normalize(12),
        color: '#454986',
        marginTop: 2,  // Espacio entre el nombre y los días restantes
    },
    descriptionProyect: {
        marginTop: 8,
    },
    mediaPreviewContainer: {
        marginVertical: normalize(10),
        maxHeight: width,
        width: '100%',
    },
    preview: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: normalize(10),
        marginTop: normalize(15),
        resizeMode: 'contain',
    },
    categoriaButton: {
        marginTop: normalize(6),
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#ECF7FD',
        color: '#0B3979',
        textAlign: 'center',
        borderColor: '#75A1DE',
        borderWidth: 3,
        borderRadius: 40,
        alignSelf: 'flex-start',
        maxWidth: '50%',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalize(10),
    },
    editButton: {
        backgroundColor: '#75A1DE',
        paddingVertical: normalize(8),
        borderRadius: normalize(5),
        width: '45%',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#E74C3C',
        paddingVertical: normalize(8),
        borderRadius: normalize(5),
        width: '45%',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: normalize(16),
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: normalize(16),
    },
    errorText: {
        fontSize: normalize(16),
        color: 'red',
        textAlign: 'center',
        marginVertical: normalize(20),
    },
    emptyText: {
        fontSize: normalize(16),
        color: '#707070',
        textAlign: 'center',
        marginVertical: normalize(20),
    },
});

export default ProjectsManagement;
