import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';

// Importar datos gráficos
import { FontAwesome } from '@expo/vector-icons';

// Importamos la clase controlador
import Login_Ctrl from "../controllers/LoginController";

// Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Tomando las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const Login = () => {
    // Instanciamos la constante de navegación
    const navigation = useNavigation();

    // Insertamos las variables de texto
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    // Indicamos que no queremos ver la contraseña del usuario cuando la digita, se pone en true
    const [showPassword, setShowPassword] = useState(true);

    // Checar que se estén cargando los datos en el sistema en la página
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setCorreo("");
            setPassword("");
            setShowPassword(true);
            console.log("Is focused on login");
        }
    }, [isFocused]);

    const navigateToSignUp = () => {
        navigation.navigate('Registrar');
    };

    const navigateToChangePassword = () => {
        navigation.navigate('Cambiar Contraseña')
    }

    const validarEmail = (email) => {
        // Usando expresiones regulares
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(String(email).toLowerCase());
    };

    const iniciarSesion = async () => {
        if (!correo.trim() || !password.trim()) {
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos');
            return;
        }

        // Validación de correo electrónico visual
        if (!validarEmail(correo)) {
            Alert.alert('Formato de correo electrónico', 'Por favor ingrese un correo electrónico válido');
            return;
        }

        const loginSystem = new Login_Ctrl(correo, password);

        try {
            const usuario = await loginSystem.validarIniciarSesion();
            console.log("Autenticación de base de datos exitosa");

            console.log(`Datos de usuario verificado: `);
            usuario.showData();

            navigation.navigate('Pagina Inicial', { usuarioActual: usuario });
        } catch (error) {
            console.error("Error durante la lógica: ", error.message);
            Alert.alert(error.message);
        }
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Qué bueno verte de nuevo!</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name="user-circle" style={styles.icon} />
                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor={'#D9D5D5'}
                    style={styles.input}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    value={correo}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" style={styles.icon} />
                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor={'#D9D5D5'}
                    style={[styles.input, styles.password]}
                    onChangeText={setPassword}
                    secureTextEntry={showPassword}
                    value={password}
                />
                
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome name={showPassword ? "eye" : "eye-slash"} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateContainer} onPress={navigateToChangePassword}>
                <Text style={styles.navigate}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateContainer} onPress={navigateToSignUp}>
                <Text style={styles.navigate}>Registrarse ahora</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 26,
        color: '#FFF',
        margin: 10,
        marginBottom: 30,
    },

    inputContainer: {
        flexDirection: 'row',
        width: '80%',
        padding: 6,
        margin: 10,
        backgroundColor: '#FEFEFE',
        borderRadius: 50,
    },
    input: {
        color: '#D9D5D5',
        fontSize: 16,
        paddingHorizontal: 4,
        width: '75%',
    },
    password: {
        width: '73%',
    },
    icon: {
        fontSize: 24,
        padding: 8,
        color: '#c4c4bc',
    },

    button: {
        width: '40%',
        marginVertical: 15,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#75A1DE',
        color: '#FFF',
        fontSize: 6,
        borderRadius: 20,
    },
    buttonText: {
        color: '#FEFEFE',
        fontSize: 16,
    },

    navigateContainer: {
        padding: 8,
    },
    navigate: {
        color: '#FEFEFE',
    },
});

export default Login;
