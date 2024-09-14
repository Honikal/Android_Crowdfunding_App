import React, {useState} from "react";
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,

    //Usado para hacer que luzca igual en todos los dispositivos
    Dimensions,
    PixelRatio,

    //Si el usuario da click por fuera, se cierra
    TouchableWithoutFeedback
} from 'react-native'

//Importamos objetos gráficos
import Logo from '../../../recursos/logo.png';

//Importamos el método de navegación
import { useNavigation } from '@react-navigation/native';

export default UpTab = ({ usuarioActual }) => {
    //State para manejar que el modal esté encendido
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //Insertamos la constante de navegación
    const navigation = useNavigation();


    const pressButtonUsuario = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const obtenerPrimeraLetra = () => {
        return usuarioActual.getNombre.charAt(0).toUpperCase();
    }

    //Opciones del menú de usuario
    const handleLogOut = async() => {
        //Maneja la opción de salir de sesión
        const controlador = new IniciarSesion_Ctrl()
        try {
            await controlador.logOut();
            setDropdownVisible(false);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error en la VIEW: ", error.message)
        }

    }

    const handleModificarUsuario = () => {
        //Maneja la opción de salir de sesión
        setDropdownVisible(false);
        navigation.navigate('Modificar Usuario', { usuarioActual: usuarioActual });
    }

    return (
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={styles.upTab}>
                <Image
                    source={Logo}
                    style= {styles.logo}
                    resizeMode= {"contain"}
                />
                <Text style={styles.title}> Gestionador Proyectos </Text>
                
                {
                    /*
                    <TouchableOpacity onPress={pressButtonUsuario} style={styles.botonUsuario}>
                        <Text style={styles.botonUsuarioText}>{obtenerPrimeraLetra()}</Text>
                    </TouchableOpacity>
                    */
                }
                
            

                {/*Acá controlamos el menú que surge al tocar el botón*/}
                {dropdownVisible && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={handleLogOut} style={styles.dropdownItem}>
                            <Text style={styles.dropdownItemText}> Salir de sesión </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleModificarUsuario} style={styles.dropdownItem}>
                            <Text style={styles.dropdownItemText}> Modificar Usuario </Text>
                        </TouchableOpacity>
                    </View>
            )}
            </View>
        </TouchableWithoutFeedback>
    )
}

//Variables usadas para detalles como manejo gráfico y disponibilidad en todos los dispositivos
const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    //Sección tab arriba
    upTab: {
        //Orden del campo
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '11%',
        width: '100%',

        paddingHorizontal: 20,
        paddingVertical: 10,
        zIndex: 10,   //Hacemos que siempre se coloca arriba

        //Colores como tal y bordes
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',

        //Android shadow
        elevation: 10,

        //Ios shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 4
    },
    logo: {
        width: '25%',
        aspectRatio: 5/4,
    },
    title: {
        fontSize: normalize(20),
    },



    botonUsuario: {
        borderRadius: normalize(24),
        borderWidth: 1,
        padding: normalize(15),
        width: normalize(48),
        height: normalize(48),
        backgroundColor: '#454986',
        alignItems: 'center',
        justifyContent: 'center'
    },
    botonUsuarioText: {
        color: '#fff',
        fontSize: normalize(18),
        textTransform: 'uppercase',
        lineHeight: normalize(18)
    },

    //Menú creado
    dropdownMenu: {
        position: 'absolute',
        top: normalize(75),
        left: width / 2,
        width: width / 2,
        backgroundColor: 'white', //Transparente
        borderRadius: 10,
        padding: 10,
        elevation: 10,

        // iOS shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
    },
    dropdownItem:{
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#454986',
        borderRadius: 5
    },
    dropdownItemText: {
        color: '#fff',
        fontSize: normalize(16)
    }
})

