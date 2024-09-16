import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
// Componente de scroll vertical
import VerticalScroll from './styleComponents/VerticalScroll';
// Importamos datos gráficos
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Donate = ({ route, navigation }) => {
    // Recibimos la cartera del usuario desde las rutas
    const { userWallet } = route.params;
    const [amount, setAmount] = useState('');

    // Función para manejar el envío del formulario
    const handleDonate = () => {
        const donationAmount = parseFloat(amount);

        if (isNaN(donationAmount) || donationAmount <= 0) {
            Alert.alert('Error', 'Por favor ingrese un monto válido.');
            return;
        }

        if (donationAmount > userWallet) {
            Alert.alert('Error', 'El monto de la donación excede el saldo disponible en su cartera.');
            return;
        }

        // Lógica para procesar la donación (enviar a API, actualizar estado, etc.)
        Alert.alert('Éxito', 'Donación realizada con éxito.');
        setAmount('');
        navigation.goBack(); // Regresa a la pantalla anterior
    };

    return (
        <VerticalScroll>
            <View style={styles.container}>
                <Text style={styles.title}>Propuestas de Donación</Text>
                <Text style={styles.info}>Monto disponible en su cartera: ${userWallet.toFixed(2)}</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="dollar" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese monto de la donación"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleDonate}>
                    <Text style={styles.buttonText}>Donar</Text>
                </TouchableOpacity>
            </View>
        </VerticalScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        marginVertical: 20,
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FEFEFE',
        borderRadius: 20,
        alignItems: 'center',
    },
    input: {
        color: '#000',
        fontSize: 16,
        paddingHorizontal: 10,
        flex: 1,
    },
    icon: {
        fontSize: 24,
        padding: 8,
        color: '#c4c4bc',
    },
    button: {
        width: '60%',
        paddingVertical: 15,
        backgroundColor: '#75A1DE',
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FEFEFE',
        fontSize: 16,
    },
});

export default Donate;
