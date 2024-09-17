import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome para usar el icono de la lupa

// Datos de prueba para los proyectos (puedes reemplazarlo con una llamada real a la API)
const proyectosData = [
    { id: '1', nombre: 'Proyecto de Tecnología' },
    { id: '2', nombre: 'Proyecto de Cultura' },
    { id: '3', nombre: 'Proyecto de Educación' },
    // Agrega más proyectos de prueba aquí...
];

const SearchPage = () => {
    const [query, setQuery] = useState(''); // Estado para la consulta de búsqueda
    const [filteredProyectos, setFilteredProyectos] = useState(proyectosData); // Estado para los proyectos filtrados

    // Función para manejar la búsqueda en tiempo real
    const handleSearch = (text) => {
        setQuery(text);
        const filtered = proyectosData.filter(proyecto =>
            proyecto.nombre.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProyectos(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Proyecto</Text>
            
            {/* Barra de búsqueda con icono de lupa */}
            <View style={styles.inputContainer}>
                <FontAwesome name="search" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del proyecto"
                    value={query}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={filteredProyectos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.projectItem}>
                        <Text style={styles.projectName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>No se encontraron proyectos</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8CEFF',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        marginBottom: 20,
        marginTop: 100, // Ajuste para mover el título más abajo
    },
    inputContainer: {
        flexDirection: 'row', // Para alinear el icono y el TextInput horizontalmente
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 20,
    },
    input: {
        flex: 1, // Ocupa el espacio restante del input
        fontSize: 16,
        paddingHorizontal: 10,
    },
    icon: {
        fontSize: 20,
        color: '#c4c4bc', // Color del icono de la lupa
        marginLeft: 10, // Un pequeño margen izquierdo para separar la lupa del borde
    },
    projectItem: {
        width: '100%',

        marginVertical: 10,
        paddingVertical: 2,
        flexDirection: 'row',

        borderWidth: 2,
        borderRadius: 16,
    },
    categoryButton: {
        marginHorizontal: 5,
        paddingVertical: 2,
        paddingHorizontal: 14,

        justifyContent: 'center',

        backgroundColor: '#ECF7FD',
        color: '#0B3979',
        textAlign: 'center',

        borderColor: '#75A1DE',

        borderRadius: 20,
        borderWidth: 0,

        elevation: 5,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    categoriaButtonSelected: {
        backgroundColor: '#A8CEFF',
    },
    projectName: {
        fontSize: 18,
        color: '#000',
    },
    noResults: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 20,
    },
});

export default SearchPage;
