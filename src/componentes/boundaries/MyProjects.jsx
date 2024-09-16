import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";
import MyProjects_Ctrl from "../controllers/MyProjectsController";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

const MyProjects = ({ route }) => {
    const { usuarioActual } = route.params;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [listaProyectos, setListaProyectos] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const enlistarProyectos = async () => {
            const controlador = new MyProjects_Ctrl(usuarioActual);
            try {
                const proyectos = await controlador.getProyectosXID();
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
            setDropdownVisible(false);
        }
    };

    const handleEditProject = (proyecto) => {
        navigation.navigate('Editar Proyecto', { proyecto, usuarioActual });
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
                    {listaProyectos.map((proyecto, index) => (
                        <View style={styles.fullProjectContainer} key={index}>
                            <ScrollView 
                                horizontal={true} 
                                contentContainerStyle={{ justifyContent: 'center' }}  // Justificación centrada
                                style={styles.mediaPreviewContainer}
                            >
                                {proyecto.getMedia && proyecto.getMedia.length > 0 && proyecto.getMedia.map((mediaItem, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: mediaItem }}
                                        style={styles.preview}
                                        resizeMode="cover"  // Asegura que la imagen se ajuste bien
                                        onError={(error) => console.log('Error cargando imagen: ', error)}
                                    />
                                ))}
                            </ScrollView>
                            <View style={[styles.proyectInfoContainer, styles.optionsContainer]}>
                                <TouchableOpacity 
                                    style={[styles.iconButtons]} 
                                    onPress={() => handleEditProject(proyecto)}
                                >
                                    <FontAwesome name="cog" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.proyectInfoContainer}>
                                <Text selectable={true} style={styles.title}>{proyecto.getNombre}</Text>
                                <Text selectable={true}>Fecha inicio: {proyecto.getFechaCreacion}</Text>
                                <Text selectable={true}>Fecha limite: {proyecto.getFechaLimite}</Text>
                                <Text selectable={true}>{proyecto.getDescripcion}</Text>
                                <View>
                                    <Text style={styles.categoriaButton}>{proyecto.getCategoria}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <DownTab
                    usuarioActual={usuarioActual}
                    paginaActual={"Pagina Inicial"}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

// Responsive code
const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

const styles = StyleSheet.create({
    // Full page
    container: {
      width: '100%',
      height: '80%',
      flexGrow: 1,
      backgroundColor: '#A8CEFF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Full project manager system
    fullProjectContainer: {
        width: '100%',
        marginVertical: normalize(5),
    },

    // Project Settings and Options Manager
    optionsContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        paddingVertical: normalize(8),
        borderTopColor: '#75A1DE',
        borderTopWidth: normalize(5),
        borderBottomLeftRadius:  normalize(0),
        borderBottomRightRadius: normalize(0),
    },
    iconButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        padding: 10,
    },
    icon: {
        fontSize: 30,
        padding: 4,
        color: '#75A1DE'
    },

    // Project image manager
    mediaPreviewContainer: {
        marginVertical: normalize(10),
        maxHeight: width * 0.5,
        width: '100%',
    },
    preview: {
        width: width * 0.8,
        height: width * 0.5,
        borderRadius: normalize(10),
        marginTop: normalize(15),
    },

    // Project information, text and categories
    proyectInfoContainer: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#ECF7FD',
        borderLeftColor: '#75A1DE',
        borderRightColor: '#75A1DE',
        borderLeftWidth:  normalize(5),
        borderRightWidth: normalize(5),
        borderBottomLeftRadius:  normalize(40),
        borderBottomRightRadius: normalize(40),
    },
    title: {
        marginBottom: 22,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0B3979',
    },
    categoryContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        width: '100%',
        alignContent: 'space-around',
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
        fontSize: 15,
    },
});

export default MyProjects;
