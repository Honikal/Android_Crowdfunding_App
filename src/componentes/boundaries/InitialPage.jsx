import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,  // Añadimos TouchableOpacity para hacer clic en los proyectos
    StyleSheet,
    Image,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback
} from 'react-native';

// Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";
import VerticalScroll from "./styleComponents/VerticalScroll";

// Importamos el controlador
import InitialPage_Ctrl from "../controllers/InitialPageController";

// Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const InitialPage = ({ route }) => {
    const { usuarioActual } = route.params;

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [listaProyectos, setListaProyectos] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const enlistarProyectos = async () => {
            const controlador = new InitialPage_Ctrl(usuarioActual);
            try {
                const proyectos = await controlador.getTodosLosProyectos();
                setListaProyectos(proyectos);
            } catch (error) {
                console.error("Error en la capa de vista: ", error);
            }
        };

        if (isFocused) {
            enlistarProyectos();
        }
    }, [isFocused, usuarioActual]);

    const navigation = useNavigation();

    const handleOutsidePress = () => {
        if (dropdownVisible) {
            console.log("Se desactiva la lista");
            setDropdownVisible(false);
        }
    };

    const obtenerPrimeraLetra = (nombre) => {
        return nombre.charAt(0).toUpperCase();
    };

    const handleProjectPress = (proyecto) => {
        // Navegamos a la pantalla de detalles del proyecto, pasando los detalles como parámetros
        navigation.navigate('Detalle Proyecto', { proyectoActual: proyecto });
        navigation.navigate('Detalle Proyecto', 
            {
                usuarioActual: usuarioActual,
                proyectoActual: proyecto 
            }
        );
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View> 
                <UpTab
                    usuarioActual={usuarioActual}
                    dropdownVisible={dropdownVisible}
                    setDropdownVisible={setDropdownVisible}
                />
                <View style={styles.container}>
                    <ScrollView>
                        {listaProyectos.map((proyecto, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.proyectoContainer}
                                onPress={() => handleProjectPress(proyecto)} // Añadimos el evento onPress
                            >
                                <ScrollView horizontal={true} style={styles.mediaPreviewContainer} nestedScrollEnabled={true}>
                                    {proyecto.media && proyecto.media.length > 0 && proyecto.media.map((mediaItem, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: mediaItem }}
                                            style={styles.preview}
                                        />
                                    ))}
                                </ScrollView>

                                <View style={styles.seccionProfile}>
                                    <View style={styles.profileIcon}>
                                        <Text style={styles.profileText}>{obtenerPrimeraLetra(proyecto.creadorNombre)}</Text>
                                    </View>
                                    <View style={styles.columnProyect}>
                                        <Text style={styles.titleProyect}>{proyecto.nombre}</Text>
                                        <Text>{proyecto.creadorNombre} </Text>
                                        {proyecto.estado_proyecto ? (
                                            <Text>{proyecto.diasRestantes} días restantes   {proyecto.porcentajeFondos}% recaudado</Text>
                                        ) : (
                                            <Text>Aún por iniciar   {proyecto.porcentajeFondos}% recaudado</Text>
                                        )}
                                    </View>
                                </View>
                                <Text style={styles.descriptionProyect} selectable={true}>{proyecto.descripcion} </Text>

                                <Text style={styles.categoriaButton}>{proyecto.categoria}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                
                <DownTab
                    usuarioActual={usuarioActual}
                    paginaActual={"Pagina Inicial"}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const { width, height } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        flexGrow: 1,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    proyectoContainer: {
        width: '100%',
        padding: 10,
        borderColor: '#A8CEFF',
        borderWidth: 2,
        backgroundColor: '#ECF7FD',
        marginBottom: 10,  // Añadimos margen para separar los proyectos
    },
    seccionProfile: {
        flexDirection: 'row'
    },
    profileIcon: {
        marginHorizontal: 2,
        width: normalize(48),
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
        padding: normalize(10),
        backgroundColor: '#75A1DE',
        borderRadius: normalize(24),
        borderWidth: 1,
        borderTopColor: '#A8CEFF',
        borderRightColor: '#A8CEFF',
        borderBottomColor: '#75A1DE',
        borderLeftColor: '#75A1DE',
    },
    profileText: {
        marginTop: 0,
        fontSize: normalize(19),
        fontWeight: 'bold',
        color: '#ECF7FD',
    },
    columnProyect: {
        marginLeft: 10,
    },
    titleProyect: {
        color: '0B3979',
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    descriptionProyect: {
        marginTop: 8,
    },
    mediaPreviewContainer: {
        marginVertical: normalize(10),
        maxHeight: width * 0.6,
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
});

export default InitialPage;
