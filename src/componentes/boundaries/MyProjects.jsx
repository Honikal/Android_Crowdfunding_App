import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    StyleSheet,
    Image,
    
    Dimensions,
    PixelRatio,

    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

//Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";
import VerticalScroll from "./styleComponents/VerticalScroll";

//Importamos el controlador
import MyProjects_Ctrl from "../controllers/MyProjectsController";

//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { ScrollView } from "react-native-gesture-handler";

const MyProjects = ( { route } ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;

    //Agregamos el state del dropdown y su visibilidad desde acá
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //Agregamos el state de la lista de proyectos
    const [listaProyectos, setListaProyectos] = useState([]);

    //Checamos que se estén cargando los datos
    const isFocused = useIsFocused();

    useEffect(() => {
        const enlistarProyectos = async () => {
            const controlador = new MyProjects_Ctrl(usuarioActual);
            try {
                //Tomamos los proyectos del sistema
                const proyectos = await controlador.getProyectosXID();
                setListaProyectos(proyectos);
            } catch (error) {
                console.error("Error en la capa de vista: ", error);
            }
        }

        if (isFocused){
            enlistarProyectos();
        }
    }, [isFocused, usuarioActual])

    //Instanciamos la constante de navegación
    const navigation = useNavigation();

    //Función encargada de manejar cuando un usuario da click fuera del dropdown
    const handleOutsidePress = () => {
        if (dropdownVisible){
            console.log("Se desactiva la lista");
            setDropdownVisible(false); //Se cierra cuando se da click afuera
        }
    }

    const manejarBotonProyecto = (proyecto) => {
        console.log("Entrando al método para cambiar a editar proyecto: ")
        proyecto.showData();
        navigation.navigate(
            'Editar Proyecto',
            {
                usuarioActual: usuarioActual,
                proyectoActual: proyecto
            }
        )
    }

    //Checar que se estén cargando los datos en el sistema en la página
    return(
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.fullContainer}> 
                <UpTab
                    usuarioActual={usuarioActual}
                    dropdownVisible={dropdownVisible}        //Pasamos la variable al UpTab
                    setDropdownVisible={setDropdownVisible}  //Pasamos el setter al UpTab
                />

                <ScrollView>
                    {listaProyectos.map((proyecto, index) => (
                        <View style={styles.fullProjectContainer} key={index} >
                            <View style={styles.mediaPreviewContainer}>
                                <ScrollView horizontal={true} nestedScrollEnabled={true}>
                                    {proyecto.getMedia && proyecto.getMedia.length > 0 && proyecto.getMedia.map((mediaItem, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: mediaItem }}
                                            style={styles.preview}
                                            onError={(error) => {console.log('Error cargando imagen: ', error)}}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                            
                            <View style={[styles.proyectInfoContainer, styles.optionsContainer]}>
                                <TouchableOpacity style={[styles.iconButtons]} onPress={() => manejarBotonProyecto(proyecto)}>
                                    <FontAwesome name="cog" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.proyectInfoContainer}>
                                <Text selectable={true} style={styles.title}>{proyecto.getNombre}</Text>

                                <Text selectable={true}>Fecha inicio: {proyecto.getFechaCreacion}</Text>
                                <Text selectable={true}>Fecha limite: {proyecto.getFechaLimite}</Text>
                                <Text selectable={true}>{proyecto.getDescripcion} </Text>

                                <View>
                                    <Text style={styles.categoriaButton}>{proyecto.getCategoria}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>


                <DownTab
                    usuarioActual={usuarioActual}
                    paginaActual={"Pagina Inicial"}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

//Responsive code?
const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}

const styles = StyleSheet.create({
    //Full page
    fullContainer: {
      flex: 1,
      backgroundColor: '#A8CEFF',
    },

    //Full project manager system
    fullProjectContainer: {
        width: '100%',

        marginVertical: normalize(5),

    },

    //Project Settings and Options Manager
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

    //Project image manager
    mediaPreviewContainer: {
        marginVertical: normalize(10),
        maxHeight: width * 0.6,
        width: '100%',

        //backgroundColor: '#c80212'
    },
    preview: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: normalize(10),
        marginTop: normalize(15),

        resizeMode: 'contain',
    },

    //Project information, text and categories
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

        alignContent: 'space-around'
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
