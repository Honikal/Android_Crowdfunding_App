import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
// import axios from "axios"; // Se utilizará una vez que los de backend conecten el API

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulación de datos de usuarios (esto es temporal)
    const mockUsers = [
        { id: 1, name: 'Jose Rodriguez', active: true },
        { id: 2, name: 'Juan Vargas', active: false },
        { id: 3, name: 'Luis Perez', active: true },
        { id: 4, name: 'Maria Mora', active: false }
    ];

    // Función para obtener los usuarios de la base de datos
    const fetchUsers = async () => {
        try {
            // Aquí iría la llamada real
            setTimeout(() => {
                setUsers(mockUsers);
                setLoading(false);
            }, 1000);
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los usuarios.");
            setLoading(false);
        }
    };

    // useEffect para ejecutar fetchUsers al cargar la pantalla
    useEffect(() => {
        fetchUsers();
    }, []);

    // Función para cambiar el estado activo de un usuario
    const toggleUserActive = async (id, currentStatus) => {
        try {
            // Aquí iría la llamada para actualizar el estado

            setUsers(users.map(user =>
                user.id === id ? { ...user, active: !user.active } : user
            ));
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el estado del usuario.");
        }
    };

    // Función para gestionar el perfil de un usuario
    const manageUserProfile = (user) => {
        Alert.alert("Gestión de Perfil", `Gestionar el perfil de ${user.name}`);
        // Lógica para editar perfil
    };

    // Renderizamos cada usuario en la lista
    const renderUserItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Switch
                value={item.active}
                onValueChange={() => toggleUserActive(item.id, item.active)}
            />
            <TouchableOpacity
                style={styles.manageButton}
                onPress={() => manageUserProfile(item)}
            >
                <Text style={styles.manageButtonText}>Gestionar</Text>
            </TouchableOpacity>
        </View>
    );

    // Indicador de carga mientras se obtienen los datos
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando usuarios...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Usuarios</Text>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 100,
        color: '#333',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    userName: {
        fontSize: 16,
        color: '#333',
    },
    manageButton: {
        backgroundColor: '#75A1DE',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    manageButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserManagement;
