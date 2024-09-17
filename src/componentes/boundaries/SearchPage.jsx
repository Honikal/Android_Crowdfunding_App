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

} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome para usar el icono de la lupa

//Importamos el controlador
import SearchPage_Ctrl from '../controllers/SearchProjectController';

import { ScrollView } from "react-native-gesture-handler";

// Datos de prueba para los proyectos (puedes reemplazarlo con una llamada real a la API)

const SearchPage = () => {
    const [listaProyectos, setListaProyectos] = useState([]);
    const [filteredProyectos, setFilteredProyectos] = useState([]); // Estado para los proyectos filtrados

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

            <View style={styles.searchContainer}>
                <Text style={styles.title}>Buscar Proyecto</Text>
                {/* Barra de búsqueda con icono de lupa */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="search" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese el nombre del proyecto"
                        value={query}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>
            
            <ScrollView horizontal style={styles.categoryContainer}>
                {getUniqueCategories().map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.categoriaButtonSelected
                        ]}
                        onPress={() => handleFilterByCategory(category)}
                    >
                        <Text style={styles.categoriaButtonText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            {/* Listar los proyectos filtrados */}
            {filteredProyectos.length === 0 ? (
                <Text style={styles.noResults}>No se encontraron los proyectos</Text>
            ) : (
                <ScrollView>
                    {filteredProyectos.map((proyecto, index) => (
                        <View key={index} style={styles.proyectoContainer}>
                            <FlatList
                                data={proyecto.media}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <Image
                                        source={{ uri: item }}
                                        style={styles.preview}
                                    />
                                )}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.mediaPreviewContainer}
                                nestedScrollEnabled={true}
                            />
                            
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
                        </View>
                    ))}
                </ScrollView>
            )}
            
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
        padding: 10,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
    },
    
    searchContainer: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        marginBottom: 20,
        marginTop: 100, // Ajuste para mover el título más abajo
    },
    inputContainer: {
        flexDirection: 'row', // Para alinear el icono y el TextInput horizontalmente
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 20,
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
        height: normalize(90),
        width: '100%',

        marginVertical: 10,
        paddingVertical: 2,
        flexDirection: 'row',

        borderWidth: 2,
        borderRadius: 16,
    },
    categoryButton: {
        marginHorizontal: 5,
        paddingVertical: 2,
        paddingHorizontal: 14,

        justifyContent: 'center',

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
        maxWidth: '50%'
    },
});

export default SearchPage;
