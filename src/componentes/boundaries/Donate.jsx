import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Donate = ({ route }) => {
    const { usuarioActual } = route.params; // Recibe el proyecto y el usuario actual
    const { proyectoActual } = route.params;

    const [monto, setMonto] = useState('');

    // Instanciamos la constante de navegación
    const navigation = useNavigation();

    const handleDonation = async() => {
        const montoNumerico = parseFloat(monto);
        if (isNaN(montoNumerico) || montoNumerico <= 0) {
            Alert.alert("Error", "Por favor, ingrese un monto válido.");
            return;
        }

        if (montoNumerico > 99000000) {
            Alert.alert("Fondos insuficientes", "No tiene suficientes fondos en su cartera para realizar esta donación.");
        } else {
            // Resta el monto de la cartera del usuario
            99000000 - montoNumerico;
            Alert.alert("Éxito", `Donaste $${montoNumerico} al proyecto ${proyecto.nombre}.`);
            // Puedes agregar lógica adicional aquí, como actualizar los fondos del proyecto

            // Después de la donación, navega de regreso a la pantalla del proyecto o a donde desees
            navigation.navigate('ProjectDetail', { proyectoActual: proyecto });
        if (montoNumerico > usuarioActual.getCantDineroBolsillo) {
            Alert.alert("Fondos insuficientes", "No tiene suficientes fondos en su cartera para realizar esta donación.");
        } else {
            // Resta el monto de la cartera del usuario
            const crearDonacion = new Donate_Ctrl(
                usuarioActual, 
                proyectoActual.idProyecto,
                montoNumerico
            );

            try {   
                const usuarioActualActualizado = await crearDonacion.crearDonacion();

                Alert.alert("Éxito", `Donaste $${montoNumerico} al proyecto ${proyectoActual.nombre}.`);

                // Después de la donación, navega de regreso a la pantalla del proyecto o a donde desees
                navigation.navigate('Detalle Proyecto',
                    {
                        usuarioActual: usuarioActualActualizado,
                        proyectoActual: proyectoActual
                    }
                );
            } catch (error) {
                console.error("Error durante la donación:", error.message);
                Alert.alert(error.message);
            }
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Donar al proyecto: {proyecto.nombre}</Text>
            <Text style={styles.projectDescription}>{proyecto.descripcion}</Text>
            <Text style={styles.title}>Donar al proyecto: {proyectoActual.nombre}</Text>
            <Text style={styles.projectDescription}>{proyectoActual.descripcion}</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Monto a Donar (USD):</Text>
                <TextInput
                    style={styles.input}
                    value={monto}
                    onChangeText={setMonto}
                    placeholder="Ingrese el monto"
                    keyboardType="numeric"
                />
                <Text style={styles.walletText}>Fondos disponibles: ${98000000}</Text>
                <Text style={styles.walletText}>Fondos disponibles: ${usuarioActual.getCantDineroBolsillo}</Text>
            </View>

            <TouchableOpacity style={styles.donateButton} onPress={handleDonation}>
                <Text style={styles.donateButtonText}>Donar</Text>
            </TouchableOpacity>
        </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F9FC',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0B3D91',
        marginTop: 100,
        marginBottom: 10,
    },
    projectDescription: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    walletText: {
        fontSize: 16,
        color: '#555',
    },
    donateButton: {
        backgroundColor: '#0B3D91',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    donateButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Donate;
