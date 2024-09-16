import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    StyleSheet,
    Image,
    
    Dimensions,
    PixelRatio,

    TouchableWithoutFeedback
} from 'react-native'

//Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";

//Importamos el controlador
import InitialPage_Ctrl from "../controllers/InitialPageController";


//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { ScrollView } from "react-native-gesture-handler";

const InitialPage = ( { route } ) => {
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
            const controlador = new InitialPage_Ctrl(usuarioActual);
            try {
                //Tomamos los proyectos del sistema
                const proyectos = await controlador.getTodosLosProyectos();
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

    const obtenerPrimeraLetra = (nombre) => {
        return nombre.charAt(0).toUpperCase();
    }

    console.log("Enlistado de proyectos: ", listaProyectos);

    //Checar que se estén cargando los datos en el sistema en la página
    return(
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View> 
                <UpTab
                    usuarioActual={usuarioActual}
                    dropdownVisible={dropdownVisible}        //Pasamos la variable al UpTab
                    setDropdownVisible={setDropdownVisible}  //Pasamos el setter al UpTab
                />
                {/*<Header></Header>*/}
                <View style={styles.container}>
                    {listaProyectos.map((proyecto, index) => (
                        <View key={index} style={styles.proyectoContainer}>
                            <View style={styles.seccionProfile}>
                                <View style={styles.profileIcon}>
                                    <Text style={styles.profileText}>{obtenerPrimeraLetra(proyecto.creadorNombre)}</Text>
                                </View>
                                <View style={styles.columnProyect}>
                                    <Text style={styles.titleProyect}>{proyecto.nombre}</Text>
                                    <Text>{proyecto.creadorNombre} </Text>
                                    {proyecto.estado_proyecto ? (
                                        <Text>{proyecto.diasRestantes}   {proyecto.porcentajeFondos}</Text>
                                    ) : (
                                        <Text>Aún por iniciar   {proyecto.porcentajeFondos}% recaudado</Text>
                                    )}

                                </View>
                            </View>
                            <Text style={styles.descriptionProyect} selectable={true}>{proyecto.descripcion} </Text>

                            <ScrollView horizontal={true} style={styles.mediaPreviewContainer}>
                                {proyecto.media && proyecto.media.length > 0 && proyecto.media.map((mediaItem, index) => {
                                    <Image
                                        key={index}
                                        source={{ uri: mediaItem.uri }}
                                        style={styles.preview}
                                    />
                                })}
                            </ScrollView>

                            <Text style={styles.categoriaButton}>{proyecto.categoria}</Text>
                        </View>
                    ))}
                </View>

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
    container: {
      width: '100%',
      height: '70%',
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
        color: '0B3979',
        fontWeight: 'bold',
        fontSize: normalize(16),
    },
    descriptionProyect: {
        marginTop: 8,
    },

    mediaPreviewContainer: {
        marginVertical: 10,
        maxHeight: width * 0.5,
    },
    preview: {
        width: width * 0.8,
        height: width * 0.5,
        borderRadius: 10,
        marginTop: 15,
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

export default InitialPage;
