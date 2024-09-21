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
import SignUp_Ctrl from "../controllers/SignUpController";

// Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Importamos la librería de máscara
import { TextInputMask } from 'react-native-masked-text';

const SignUp = () => {
    const navigation = useNavigation();

    // Insertamos las variables de texto
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [cedula, setCedula] = useState("");
    const [correo, setCorreo] = useState("");
    const [areaTrabajo, setAreaTrabajo] = useState("");
    const [telefono, setTelefono] = useState("");    
    const [dineroInicial, setDineroInicial] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [formSubmited, setFormSubmited] = useState(false);

    // Checar que se estén cargando los datos en el sistema en la página
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setNombreCompleto("");
            setCedula("");
            setCorreo("");
            setAreaTrabajo("");
            setTelefono("");
            setDineroInicial("");
            setPassword("");
            setConfirmPassword("");
            console.log("Is focused on sign up");
        }
    }, [isFocused]);

    const validarEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        return emailPattern.test(String(email).toLowerCase());
    };

    const validarTelefono = (telefono) => {
        const phonePattern = /^[2,4,5,6,7,8][0-9]{3}-[0-9]{4}$/;
        return phonePattern.test(telefono);
    };

    const validarPassword = () => {
        return password === confirmPassword;
    };

    const Registrar = async () => {
        setFormSubmited(true);

        if (!nombreCompleto.trim() || !cedula.trim() || !correo.trim() || !telefono.trim() ||
         !password.trim() || !confirmPassword || !dineroInicial) {
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos');
            return;
        }

        if (!validarEmail(correo)) {
            Alert.alert('Formato de correo electrónico', 'Por favor ingrese un correo electrónico válido');
            return;
        }

        if (isNaN(parseFloat(dineroInicial)) || parseFloat(dineroInicial) < 0){
            Alert.alert('Formato de dinero', 'Por favor ingrese un monto de dinero inicial conformado por numeros positivos');
            return;
        }

        if (!validarTelefono(telefono)) {
            Alert.alert('Formato de número teléfono incorrecto', 'Introduzca un número telefónico válido');
            return;
        }

        if (!validarPassword()) {
            Alert.alert('Contraseñas distintas', 'Por favor, asegúrese que ambas contraseñas sean iguales');
            return;
        }

        try {
            const registrar = new SignUp_Ctrl(nombreCompleto, cedula, areaTrabajo, parseFloat(dineroInicial),
            telefono, correo, password);
            const usuarioActual = await registrar.registrarUsuario();

            Alert.alert("Usuario registrado", "El usuario ha sido registrado exitosamente");
            navigation.navigate('Pagina Inicial', { usuarioActual: usuarioActual });
            
        } catch (error) {
            console.error("Error durante el registro:", error.message);
            Alert.alert(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VerticalScroll>
                <View style={styles.container}>
                    {/* Botón para cerrar y volver al login */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <FontAwesome name="times-circle" style={styles.closeIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Crear Cuenta</Text>

                    <View style={[styles.inputContainer, !nombreCompleto && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="user-circle" style={styles.icon} />
                        <TextInput
                            placeholder="Nombre completo"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            onChangeText={setNombreCompleto}
                            value={nombreCompleto}
                        />
                    </View>
                    {!nombreCompleto && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar su nombre completo</Text>
                        </View>
                    ) : null}

                    <View style={[styles.inputContainer, !cedula && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="id-card" style={styles.icon} />
                        <TextInputMask
                            type={"custom"}
                            options={{
                                mask: '9-9999-9999'
                            }}
                            placeholder="Cédula"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            onChangeText={setCedula}
                            value={cedula}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    {!cedula && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar su cédula</Text>
                        </View>
                    ) : null}

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

                    <View style={styles.inputContainer}>
                        <FontAwesome name="briefcase" style={styles.icon} />
                        <TextInput
                            placeholder="Área de trabajo"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            onChangeText={setAreaTrabajo}
                            value={areaTrabajo}
                        />
                    </View>

                    <View style={[styles.inputContainer, !telefono && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="phone" style={styles.icon} />
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '9999-9999'
                            }}
                            placeholder="Número de teléfono"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            keyboardType={"number-pad"}
                            onChangeText={setTelefono}
                            value={telefono}
                        />
                    </View>
                    {!telefono && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar su número de teléfono</Text>
                        </View>
                    ) : null}

                    <View style={styles.inputContainer}>
                        <FontAwesome name="credit-card" style={styles.icon} />
                        <TextInput
                            placeholder="Dinero inicial"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            keyboardType={"number-pad"}
                            onChangeText={setDineroInicial}
                            value={dineroInicial}
                        />
                    </View>
                    {!dineroInicial && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar un monto inicial</Text>
                        </View>
                    ) : null}

                    <View style={[styles.inputContainer, !password && (formSubmited ? styles.required_input : styles.input)]}>
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
                    {!password && formSubmited ? (
                        <View style={styles.errorContainer}>
                            <FontAwesome name="exclamation-circle" style={styles.errorIcon} />
                            <Text style={styles.errorText}>Debe ingresar una contraseña</Text>
                        </View>
                    ) : null}

                    <View style={[styles.inputContainer, !confirmPassword && (formSubmited ? styles.required_input : styles.input)]}>
                        <FontAwesome name="lock" style={styles.icon} />
                        <TextInput
                            placeholder="Confirmar contraseña"
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

                    <TouchableOpacity style={styles.button} onPress={Registrar}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </VerticalScroll>
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
        marginTop: '40%',
        marginBottom: 30
    },
    closeButton: {
        position: 'absolute',
        top: 130,
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
});

export default SignUp;
