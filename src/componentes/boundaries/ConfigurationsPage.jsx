import React, { useState } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';

// Tomando las dimensiones de la pantalla
const { width } = Dimensions.get('window');

const NotificationSettings = () => {
    // Estados para las preferencias de notificación
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    // Función para manejar el guardado de las preferencias
    const handleSavePreferences = () => {
        Alert.alert("Preferencias Guardadas", "Tus preferencias de notificación han sido actualizadas.");
        // Aquí puedes agregar la lógica para guardar las preferencias en la base de datos o en el servidor
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración de Notificaciones</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notificaciones por Email</Text>
                <Switch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notificaciones Push</Text>
                <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Notificaciones por SMS</Text>
                <Switch
                    value={smsNotifications}
                    onValueChange={setSmsNotifications}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSavePreferences}>
                <Text style={styles.buttonText}>Guardar Preferencias</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        marginBottom: 30,
        marginTop: 100,
        textAlign: 'center',
    },
    settingItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FEFEFE',
        borderRadius: 10,
        marginBottom: 20,
    },
    settingText: {
        fontSize: 18,
        color: '#000',
    },
    button: {
        width: '60%',
        marginVertical: 20,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#75A1DE',
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    }
});

export default NotificationSettings;
