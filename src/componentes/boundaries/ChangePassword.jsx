import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Dimensions,
    PixelRatio,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

// Importar datos gráficos y componentes visuales
import { FontAwesome } from '@expo/vector-icons';
import VerticalScroll from "./styleComponents/VerticalScroll";

// Importamos la clase controlador
import ChangePassword_Ctrl from "../controllers/ChangePasswordController";

// Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Importamos la librería de máscara
import { TextInputMask } from 'react-native-masked-text';

const ChangePassword = () => {
    const navigation = useNavigation();

    // Insertamos las variables de texto
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [formSubmited, setFormSubmited] = useState(false);

    // Checar que se estén cargando los datos en el sistema en la página
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setCorreo("");
            setPassword("");
            setConfirmPassword("");
            console.log("Is focused on change password");
        }
    }, [isFocused]);

    const validarEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        return emailPattern.test(String(email).toLowerCase());
    };

    const validarPassword = () => {
        return password === confirmPassword;
    };

    const ChangePassword = async () => {
        setFormSubmited(true);

        if (!correo.trim() || !password.trim() || !confirmPassword) {
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos');
            return;
        }

        if (!validarEmail(correo)) {
            Alert.alert('Formato de correo electrónico', 'Por favor ingrese un correo electrónico válido');
            return;
        }

        if (!validarPassword()) {
            Alert.alert('Contraseñas distintas', 'Por favor, asegúrese que ambas contraseñas sean iguales');
            return;
        }

        try {
            const controller = new ChangePassword_Ctrl(correo, password);
            await controller.modifyPassword();

            Alert.alert("Contraseña cambiada", "El usuario ha cambiado de contraseña exitosamente");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error durante el registro:", error.message);
            Alert.alert(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.fullScreen}>
                <View style={styles.container}>
                    {/* Botón para cerrar y volver al login */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <FontAwesome name="times-circle" style={styles.closeIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Cambiar contraseña</Text>

                    <View style={[styles.inputContainer, !correo && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="envelope-o" style={styles.icon} />
                        <TextInput
                            placeholder="Correo electrónico"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            keyboardType={"email-address"}
                            onChangeText={setCorreo}
                            value={correo}
                        />
                    </View>
                    {!correo && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar su correo</Text>
                        </View>
                    ) : null}

                    <View style={[styles.inputContainer, !password && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="lock" style={styles.icon} />
                        <TextInput
                            placeholder="Nueva contraseña"
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
                    {!password && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar una contraseña</Text>
                        </View>
                    ) : null}

                    <View style={[styles.inputContainer, !confirmPassword && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="lock" style={styles.icon} />
                        <TextInput
                            placeholder="Confirmar nueva contraseña"
                            placeholderTextColor={'#D9D5D5'}
                            style={[styles.input, styles.password]}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={showConfirmPassword}
                            value={confirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {!confirmPassword && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe confirmar su contraseña</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity style={styles.button} onPress={ChangePassword}>
                        <Text style={styles.buttonText}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
};

// Responsive code
const { width, height } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    fullScreen: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#A8CEFF',
    },
    container: {
        marginTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        margin: 10,
        marginTop: '30%',
        marginBottom: 40
    },
    closeButton: {
        position: 'absolute',
        top: 105,
        right: 20,
    },
    closeIcon: {
        fontSize: 30,
        color: '#FFF',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '80%',
        padding: 6,
        margin: 14,
        backgroundColor: '#FEFEFE',
        borderRadius: 50,
    },
    input: {
        color: '#D9D5D5',
        fontSize: 16,
        paddingHorizontal: 4,
        width: '80%'
    },
    password: {
        width: '73%'
    },
    icon: {
        fontSize: 24,
        padding: 8,
        color: '#c4c4bc'
    },
    errorContainer: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        marginLeft: normalize(20)
    },  
    errorIcon: {
        marginRight: normalize(10),
        fontSize: normalize(18),
        color: 'red'
    },
    errorText: {
        color: 'red',
        fontSize: normalize(14),
        marginBottom: normalize(5),
        marginLeft: normalize(5)
    },
    required_input: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: 'red',
        borderRadius: 50,
    },
    button: {
        marginVertical: 15,
        padding: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#75A1DE',
        color: '#FFF',
        fontSize: 6,
        borderRadius: 20,
    },
    buttonText: {
        color: '#FEFEFE',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default ChangePassword;
