import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,

    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,

    Dimensions, 
    PixelRatio,

    TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome para usar el icono de la lupa

//Importamos el controlador
import SearchPage_Ctrl from '../controllers/SearchProjectController';
import { ScrollView } from "react-native-gesture-handler";

// Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";

const SearchPage = ({ route }) => {
    const { usuarioActual } = route.params;

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [listaProyectos, setListaProyectos] = useState([]);
    const [filteredProyectos, setFilteredProyectos] = useState([]); // Estado para los proyectos filtrados
    const [error, setError] = useState(null);

    const [query, setQuery] = useState(''); // Estado para la consulta de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const extraerProyectos = async() => {
            const controlador = new SearchPage_Ctrl();
            try {
                const proyectos = await controlador.getTodosLosProyectos();
                setListaProyectos(proyectos);
                setFilteredProyectos(proyectos);
            } catch (error) {
                console.error("Error en la capa de vista: ", error);
            }
        };

        extraerProyectos();
    }, []);

    const obtenerPrimeraLetra = (nombre) => {
        return nombre.charAt(0).toUpperCase();
    };

    const handleOutsidePress = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        }
    };

    // Función para manejar la búsqueda en tiempo real
    const handleSearch = (text) => {
        console.log("Texto como query: ", text);

        setQuery(text);

        if (text !== ''){
            setFilteredProyectos(SearchPage_Ctrl.filterProyectosWithQuery(filteredProyectos, text));
        } else {
            setFilteredProyectos(listaProyectos)
        }
    };

    //Hacer el método de filtrado por categorías
    const handleFilterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === 'Todos') {
            setFilteredProyectos(listaProyectos);
        } else {
            setFilteredProyectos(SearchPage_Ctrl.filterProyectosByCategory(listaProyectos, category));
        }
    }

    //Tomar categorías únicas por proyecto
    const getUniqueCategories = () => {
        const categories = listaProyectos.map(proyecto => proyecto.categoria);
        return ['Todos', ... new Set(categories)];
    }

    console.log("Proyectos filtrados: ", filteredProyectos);

    return (
        <View style={styles.container}>
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
                    <ScrollView 
                        keyboardShouldPersistTaps={"handled"} 
                        contentContainerStyle={{ paddingBottom: normalize(20) }}  // Add padding for a smoother scroll
                    >
                        {listaProyectos.length > 0 ? (
                            listaProyectos.map((proyecto, index) => (
                                <View key={index} style={styles.proyectoContainer}>
                                    {/* Horizontal scrolling for the project images */}
                                    <ScrollView 
                                        horizontal={true} 
                                        showsHorizontalScrollIndicator={false} // Disable horizontal scroll indicator for better UI
                                        style={styles.mediaPreviewContainer}
                                    >
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
                paginaActual={"Busqueda"}
            />
        </View>
        
    );
};

const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
    },

    contextContainer:{
        flex: 1,
        alignItems: 'center'
    },
    
    searchContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row', // Para alinear el icono y el TextInput horizontalmente
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    input: {
        flex: 1, // Ocupa el espacio restante del input
        fontSize: 16,
        paddingHorizontal: 10,
    },
    icon: {
        fontSize: 20,
        color: '#c4c4bc', // Color del icono de la lupa
        marginLeft: 10, // Un pequeño margen izquierdo para separar la lupa del borde
    },

    categoryContainer: {
        width: '100%',

        marginVertical: 25,
        marginTop: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',

        borderWidth: 2,
        borderRadius: 16,
    },
    categoryButton: {
        margin: 5,
        height: normalize(45),
        paddingVertical: 10,
        paddingHorizontal: 16,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#ECF7FD',
        color: '#0B3979',
        textAlign: 'center',

        borderColor: '#75A1DE',

        borderRadius: 20,
        borderWidth: 0,

        elevation: 5,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    categoriaButtonSelected: {
        backgroundColor: '#A8CEFF',
    },
    categoriaButtonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center'
    },
    noResults: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 20,
    },

    
    proyectoContainer: {
        flex: 1,

        width: '100%',
        padding: 10,
        borderColor: '#A8CEFF',
        borderWidth: 2,
        backgroundColor: '#ECF7FD'
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
        maxWidth: '90%',
        color: '0B3979',
        fontWeight: 'bold',
        fontSize: normalize(16),
        flexWrap: 'wrap'
    },
    descriptionProyect: {
        marginTop: 8,
        maxWidth: '50%',
        flexWrap: 'wrap'
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
        maxWidth: '50%'
    },

    emptyText: {
        fontSize: normalize(16),
        color: '#707070',
        textAlign: 'center',
        marginVertical: normalize(20),
    },
});

export default SearchPage;
