import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    TouchableOpacity,
    TextInput,

    StyleSheet,
    
    Alert,
    Dimensions,
    PixelRatio,

    //Manejo mejor para el ux cuando el usuario da click fuera del campo de texto
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'

//Importar datos gráficos y componentes visuales
import { FontAwesome } from '@expo/vector-icons'
import VerticalScroll from "./styleComponents/VerticalScroll";

//Importamos la clase controlador
import ModifyAccount_Ctrl from "../controllers/ModifyAccountController"

//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'

//useIsFocused luego es usado para limpiar la pantalla una vez se entra o se sale del sistema

//Importamos la librería de máscara
import { TextInputMask } from 'react-native-masked-text'

const ModifyAccount = ( { route } ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;

    //Instanciamos la constante de navegación
    const navigation = useNavigation();

    //Insertamos las variables de texto como tal
    const [correo, setCorreo] = useState(usuarioActual.getCorreo);
    const [areaTrabajo, setAreaTrabajo] = useState(usuarioActual.getAreaTrabajo);
    const [telefono, setTelefono] = useState(usuarioActual.getTelefono);    
    const [dineroInicial, setDineroInicial] = useState(usuarioActual.getCantDineroBolsillo.toString());
    const [password, setPassword] = useState(usuarioActual.getPassword);
    const [confirmPassword, setConfirmPassword] = useState("");

    //De ésta forma indicamos que no queremos ver la contraseña del usuario cuando la digita, se pone en true
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [formSubmited, setFormSubmited] = useState(false);

    //Checar que se estén cargando los datos en el sistema en la página
    const isFocused = useIsFocused();

    //Funciones principales o _on_ready()
    useEffect(() => {
        if (isFocused){
            setCorreo(usuarioActual.getCorreo);
            setAreaTrabajo(usuarioActual.getAreaTrabajo);
            setTelefono(usuarioActual.getTelefono);
            setDineroInicial(usuarioActual.getCantDineroBolsillo.toString());
            setPassword(usuarioActual.getPassword);
            setConfirmPassword("");
            //setShowPassword(true);
            console.log("Is focused on managing account");
        }
    }, [isFocused])

    const validarEmail = (email) => {
        //Usando expresiones regulares
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        return emailPattern.test(String(email).toLowerCase());
    }

    const validarTelefono = (telefono) => {
        //Usamos expresiones regulares
        const phonePattern = /^[2,4,5,6,7,8][0-9]{3}-[0-9]{4}$/; //Tipo registro expresion regular
        return phonePattern.test(telefono)
    }

    const validarPassword = () => {
        return password === confirmPassword;
    }

    const checarFortalezaPassword = () => {
        //Con ésto podemos checar a tiempo real la fortaleza de la contraseña como tal
        if ((password.length < 6) && (password.length > 0)) return "Weak";
        if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) return "Medium";
        if (password.match(/[A-Za-z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong";
        return "";
    }

    const Registrar = async() => {
        //Asignamos que el form de registro ya se ha llenado
        setFormSubmited(true);

        if (!correo.trim() || !telefono.trim() || !password.trim() || !confirmPassword) {
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos');
            return;
        }

        //Validación de correo electrónico visual
        if (!validarEmail(correo)){
            Alert.alert('Formato de correo electrónico', 'Por favor ingrese un correo electrónico válido');
            return;
        }

        //Validación de número de teléfono
        if (!validarTelefono(telefono)) {
            Alert.alert('Formato de número teléfono incorrecto', 'Introduzca un número telefónico de extensión +506')
            return;
        }

        //Validación de password igual al confirm password
        if (!validarPassword()){
            Alert.alert('Contraseñas distintas', 'Por favor, asegúrese que ambas contraseñas sean iguales');
            return;
        }

        //Acá llamaremos al controlador como tal a que haga su función principal

        try {
            const modificarUsuario = new ModifyAccount_Ctrl(
                usuarioActual,
                correo,
                password,
                telefono,
                areaTrabajo,
                dineroInicial
            );

            const usuarioModificado = await modificarUsuario.modifyUser();

            if (usuarioModificado){
                Alert.alert("Usuario modificado", "Se ha modificado la información de la cuenta");
                navigation.navigate('Pagina Inicial',
                    { usuarioActual: usuarioActual }
                )
            }else{
                console.log("No se efectuaron los cambios");
            }
        } catch (error) {
            console.error("Error durante la lógica: ", error.message);
            Alert.alert(error.message);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VerticalScroll>
                <View style={styles.container}>
                    {/* Botón para cerrar y volver al login */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <FontAwesome name="times-circle" style={styles.closeIcon} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Modificar datos de Cuenta</Text>

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
                            placeholder="Dinero actual"
                            placeholderTextColor={'#D9D5D5'}
                            style={styles.input}
                            keyboardType={"number-pad"}
                            onChangeText={setDineroInicial}
                            value={dineroInicial}
                        />
                    </View>

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
                        <Text style={styles.buttonText}>Modificar cuenta</Text>
                    </TouchableOpacity>
                </View>
            </VerticalScroll>
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
        top: 100,
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

export default ModifyAccount;
