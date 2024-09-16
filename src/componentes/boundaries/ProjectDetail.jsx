import React from 'react';
import {
    View,
    Text,
    TouchableOpacity, // Cambiamos Button por TouchableOpacity para darle estilo
    Image,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProjectDetail = ({ route }) => {
    const { proyectoActual } = route.params;
    const navigation = useNavigation();

    const handleDonate = () => {
        navigation.navigate('Donar', { proyecto: proyectoActual });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{proyectoActual.nombre}</Text>
            <Text style={styles.creator}>Creador: {proyectoActual.creadorNombre}</Text>
            <Text style={styles.description}>{proyectoActual.descripcion}</Text>

            <ScrollView horizontal={true} style={styles.mediaContainer}>
                {proyectoActual.media && proyectoActual.media.length > 0 && proyectoActual.media.map((mediaItem, index) => (
                    <Image
                        key={index}
                        source={{ uri: mediaItem.uri }}
                        style={styles.media}
                    />
                ))}
            </ScrollView>

            <Text style={styles.funds}>Meta de Fondos: {proyectoActual.porcentajeFondos}% alcanzado</Text>

            <TouchableOpacity style={styles.button} onPress={handleDonate}>
                <Text style={styles.buttonText}>Donar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ECF7FD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B3979',
        marginBottom: 10,
        marginTop: 100,
    },
    creator: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    mediaContainer: {
        marginBottom: 20,
    },
    media: {
        width: width * 0.8,
        height: width * 0.5,
        borderRadius: 10,
        marginRight: 10,
    },
    funds: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0B3979',
        marginBottom: 20,
    },
    button: {
        width: '40%',
        marginVertical: 15,       
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#75A1DE',
        borderRadius: 20,
    },
    buttonText: {
        color: '#FEFEFE',
        fontSize: 16,
    },
});

export default ProjectDetail;
