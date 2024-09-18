import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator
} from "react-native";

//Importamos controlador
import UserManagement_Ctrl from "../controllers/UserManagementController";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadTrigger, setReloadTrigger] = useState(false); //Trigger para recargar la página

    // useEffect para ejecutar fetchUsers al cargar la pantalla
    useEffect(() => {
        // Función para obtener los usuarios de la base de datos
        const fetchUsers = async () => {
            const controlador = new UserManagement_Ctrl();
            try {
                const usuarios = await controlador.getUsuariosPrograma();
                setTimeout(() => {
                    setUsers(usuarios);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                Alert.alert("Error", "No se pudieron cargar los usuarios.");
                console.error("Error en la capa de vista: ", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [reloadTrigger]);

    // Función para cambiar el estado activo de un usuario
    const toggleUserActive = async (id, currentStatus) => {
        try {
            const updatedUsers = users.map(user => {
                user.showData();

                if (user.getIdUsuario === id){
                    //Llamamos al método de ser activa en el objeto de usuario
                    console.log("Si entramos acá de forma correcta");
                    user.setActiva = !currentStatus;
                    //Cambiamos los datos
                    console.log("Se cambia el estado del usuario");
                }
                return user; //Retornamos el usuario una vez data ha sido modificada
            });
            //Actualizamos el estado como tal
            setUsers(updatedUsers);
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el estado del usuario.");
        }
    };

    const desactivacionCuenta = async(user, mensaje) => {
        const controlador = new UserManagement_Ctrl(user);
        try {
            await controlador.updateStateOfAccount();
            console.log("Se ha desactivado el uso de cuenta del usuario: ", user.getNombre);
            Alert.alert("Cambios registrados", `Se ha ${mensaje} la cuenta del usuario: ${user.getNombre}`);

            //Ejecutamos el trigger
            setReloadTrigger(!reloadTrigger);
        } catch (error) {
            console.error("Error durante la lógica: ", error.message);
            Alert.alert(error.message);
        }
    }

    // Función para gestionar el perfil de un usuario
    const manageUserProfile = async(user) => {
        let mensaje = user.isActiva ? "activar" : "desactivar";
        let mensaje2 = user.isActiva ? "activado" : "desactivado"

        Alert.alert('Confirmacion',
                    `¿Estás seguro de que deseas ${mensaje} la cuenta de ${user.getNombre}?`,
                    [
                        {
                            text: "Cancelar",
                            onPress: () => console.log("Operación cancelada"),
                            style: "cancel"
                        },
                        {
                            text: `Sí, ${mensaje} cuenta`,
                            onPress: () => desactivacionCuenta(user, mensaje2)
                        },
                    ], {cancelable: true}
                    );
    };

    // Renderizamos cada usuario en la lista
    const renderUserItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.getNombre}</Text>
            <Switch
                value={item.isActiva}
                onValueChange={() => toggleUserActive(item.getIdUsuario, item.isActiva)}
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
                keyExtractor={(item) => item.getIdUsuario}
                scrollEnabled={true}
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
        width: '55%',
        flexWrap: 'wrap'
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
