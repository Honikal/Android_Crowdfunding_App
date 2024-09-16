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
    TouchableWithoutFeedback,
} from 'react-native'
import Constants from "expo-constants";

//Importamos controlador que hace función de logout
import Login_Ctrl from "../../controllers/LoginController.js";

//Importamos objetos gráficos
import Logo from '../../../../assets/logo.png';

//Importamos el método de navegación
import { useNavigation } from '@react-navigation/native';

export default UpTab = ({ usuarioActual, dropdownVisible, setDropdownVisible }) => {
    //Como parámetros estamos recibiendo el usuario, el dropdown y el setter

    console.log("Usuario actual pasado en el up tab");
    usuarioActual.showData();

    console.log("Mostramos la variable del dropdown menu: ", dropdownVisible);
    console.log("Mostramos la función encargada de setear el tab: ", setDropdownVisible);

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
        const controlador = new Login_Ctrl()
        try {
            await controlador.logOut();
            setDropdownVisible(false);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error en la VIEW: ", error.message)
        }

    }

    const handleModificarUsuario = () => {
        setDropdownVisible(false);
        navigation.navigate('Modificar Cuenta', { usuarioActual: usuarioActual });
    }

    const handleGestionarUsuario = () => {
        setDropdownVisible(false);
        navigation.navigate('Gestionar Usuario', { usuarioActual: usuarioActual });
    }
    
    const handleMyProjects = async() => {
        //Maneja la opción de ver los proyectos del usuario
        setDropdownVisible(false);
        navigation.navigate('Mis Proyectos', { usuarioActual: usuarioActual });
    }

    const handleConfigurations = async() => {
        //Maneja la opción de ver los proyectos del usuario
        setDropdownVisible(false);
        navigation.navigate('Configuraciones', { usuarioActual: usuarioActual });
    }

    return (
        <View style={[styles.upTab]}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style= {styles.logo}
                    resizeMode= {"contain"}
                />
                <Text style={styles.logoText}>Crowdfounder</Text>
            </View> 
            <TouchableOpacity onPress={pressButtonUsuario} style={styles.profileButton}>
                <Text style={styles.botonUsuarioText}>{obtenerPrimeraLetra()}</Text>
            </TouchableOpacity>

            {/*Acá controlamos el menú que surge al tocar el botón*/}
            {dropdownVisible && (
                <View style={styles.dropdownMenu}>
                    <View style={styles.welcomeContaniner}>
                        <Text>{usuarioActual.getCorreo}</Text>
                        <View style={[styles.profileButton, styles.accountImage]}>
                            <Text style={[styles.accountImageText]}>{obtenerPrimeraLetra()}</Text>
                        </View>
                        <Text>¡Hola {usuarioActual.getNombre}!</Text>
                    </View>

                    <TouchableOpacity onPress={handleModificarUsuario} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}> Modificar cuenta </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMyProjects} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}> Mis proyectos </Text>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={handleGestionarUsuario} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}> Gestionar Usuarios </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfigurations} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}> Configuraciones </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogOut} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}> Salir de sesión </Text>
                    </TouchableOpacity>
                    
                </View>
        )}
        </View>
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
        flexGrow: 1,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        paddingHorizontal: 15,
        zIndex: 10,   //Hacemos que siempre se coloca arriba

        //Colores como tal y bordes
        backgroundColor: '#ECF7FD',
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

    logoContainer : {
        marginTop: Constants.statusBarHeight,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(5),

        //borderWidth: 3,
        //borderColor: '000',   
    },
    logo: {
        width: normalize(50),
        height: normalize(50),

        //borderWidth: 3,
        //borderColor: '#589389',   
    },
    logoText: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#75A1DE'
    },

    profileButton: {
        marginTop: Constants.statusBarHeight,

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
    botonUsuarioText: {
        color: '#ECF7FD',
        fontSize: normalize(19),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        lineHeight: normalize(18)
    },

    //Menú creado
    dropdownMenu: {
        position: 'absolute',
        top: normalize(75),
        left: normalize(width / 3),
        width: '75%',
        alignItems: 'center',

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
    },
    welcomeContaniner: {
        marginBottom: 20,
        alignItems: 'center',
    },
    accountImage: {
        marginVertical: 20
    },
    accountImageText: {
        marginTop: 0,
        fontSize: normalize(19),
        fontWeight: 'bold',
        color: '#ECF7FD',
    },
})

