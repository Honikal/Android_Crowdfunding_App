import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
} from 'react-native';
import Constants from "expo-constants";

// Controlador que hace función de logout
import Login_Ctrl from "../../controllers/LoginController.js";

// Logo de la aplicación
import Logo from '../../../../assets/logo.png';

// Método de navegación
import { useNavigation } from '@react-navigation/native';

export default UpTab = ({ usuarioActual, dropdownVisible, setDropdownVisible }) => {
    const navigation = useNavigation();

    const pressButtonUsuario = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const obtenerPrimeraLetra = () => {
        return usuarioActual.getNombre.charAt(0).toUpperCase();
    }

    // Opciones del menú de usuario
    const handleLogOut = async () => {
        const controlador = new Login_Ctrl();
        try {
            await controlador.logOut();
            setDropdownVisible(false);
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error en la VIEW: ", error.message);
        }
    }

    const handleModificarUsuario = () => {
        setDropdownVisible(false);
        navigation.navigate('Modificar Cuenta', { usuarioActual });
    }

    const handleGestionarUsuario = () => {
        setDropdownVisible(false);
        navigation.navigate('Gestionar Usuario', { usuarioActual });
    }

    const handleMonitorearProyectos = () => {
        setDropdownVisible(false);
        navigation.navigate('Monitorear Proyectos', { usuarioActual });
    }

    const handleMonitorearDonaciones = () => {
        setDropdownVisible(false);
        navigation.navigate('Monitorear Donaciones', { usuarioActual });
    }

    const handleVerEstadisticas = () => {
        setDropdownVisible(false);
        navigation.navigate('Ver Estadísticas', { usuarioActual });
    }

    const handleMyProjects = () => {
        setDropdownVisible(false);
        navigation.navigate('Mis Proyectos', { usuarioActual });
    }

    return (
        <View style={[styles.upTab]}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode={"contain"}
                />
                <Text style={styles.logoText}>Crowdfounder</Text>
            </View>

            <TouchableOpacity onPress={pressButtonUsuario} style={styles.profileButton}>
                <Text style={styles.botonUsuarioText}>{obtenerPrimeraLetra()}</Text>
            </TouchableOpacity>

            {/* Acá controlamos el menú que surge al tocar el botón */}
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
                        <Text style={styles.dropdownItemText}>Modificar cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleMyProjects} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}>Mis Proyectos</Text>
                    </TouchableOpacity>

                    

                    {/* Opciones solo visibles para el administrador */}
                    {usuarioActual.isAdmin && (
                        <>
                            <TouchableOpacity onPress={handleGestionarUsuario} style={styles.dropdownItem}>
                                <Text style={styles.dropdownItemText}>Gestionar Usuarios</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleMonitorearProyectos} style={styles.dropdownItem}>
                                <Text style={styles.dropdownItemText}>Monitorear Proyectos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleMonitorearDonaciones} style={styles.dropdownItem}>
                                <Text style={styles.dropdownItemText}>Monitorear Donaciones</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleVerEstadisticas} style={styles.dropdownItem}>
                                <Text style={styles.dropdownItemText}>Ver Estadísticas</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    
                    <TouchableOpacity onPress={handleLogOut} style={styles.dropdownItem}>
                        <Text style={styles.dropdownItemText}>Salir de sesión</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    upTab: {
        height: normalize(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 15,
        zIndex: 10,
        backgroundColor: '#ECF7FD',
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
    },
    logoContainer: {
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(5),
    },
    logo: {
        width: normalize(50),
        height: normalize(50),
    },
    logoText: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: '#75A1DE',
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
        lineHeight: normalize(18),
    },
    dropdownMenu: {
        position: 'absolute',
        top: normalize(75),
        left: normalize(width / 3),
        width: '75%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
    },
    dropdownItem: {
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#454986',
        borderRadius: 5,
    },
    dropdownItemText: {
        color: '#fff',
        fontSize: normalize(16),
    },
    welcomeContaniner: {
        marginBottom: 20,
        alignItems: 'center',
    },
    accountImage: {
        marginVertical: 20,
    },
    accountImageText: {
        marginTop: 0,
        fontSize: normalize(19),
        fontWeight: 'bold',
        color: '#ECF7FD',
    },
});