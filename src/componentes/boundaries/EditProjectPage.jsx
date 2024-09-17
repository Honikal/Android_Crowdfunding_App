import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

//Importamos el controlador
import ModifyProject_Ctrl from '../controllers/ModifyProjectController';

import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProjectPage = ({ route, navigation }) => {
    const { usuarioActual } = route.params;
    const { proyectoActual } = route.params;

    console.log("Prueba dentro del edit de proyectos: ");
    proyectoActual.showData();

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }

    const [projectName, setProjectName] = useState(proyectoActual.getNombre);
    const [description, setDescription] = useState(proyectoActual.getDescripcion);
    const [fundingGoal, setFundingGoal] = useState(proyectoActual.getObjetivoFinanciero.toString());
    const [category, setCategory] = useState(proyectoActual.getCategoria);
    const [media, setMedia] = useState(proyectoActual.getMedia || []);

    const [startDate, setStartDate] = useState( parseDate(proyectoActual.getFechaCreacion) );
    const [endDate, setEndDate] = useState( parseDate(proyectoActual.getFechaLimite) );

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleMediaUpload = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'Necesitamos permisos para acceder a tus archivos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newMedia = {
                uri: result.assets[0].uri,
                type: result.assets[0].type === "image" ? "image" : "video",
            };

            setMedia([...media, newMedia]);
        }
    };

    const handleUpdateProject = async () => {
        // Aquí pones la lógica para actualizar el proyecto en la base de datos
        if (!projectName.trim() || !description.trim() || !fundingGoal.trim() 
        || category === "Seleccionar Categoría"){
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos');
            return;
        }

        try {
            const modificarProyecto = new ModifyProject_Ctrl(
                proyectoActual,
                projectName,
                description,
                fundingGoal,
                category,
                formatDate(startDate),
                formatDate(endDate),
                media
            );

            const proyectoModificado = modificarProyecto.modifyProject();

            if (proyectoModificado){
                Alert.alert('Proyecto Actualizado', 'Los cambios se han guardado exitosamente.');
                navigation.goBack();
            }else{
                console.log("No se efectuaron los cambios");
            }
        } catch (error) {
            console.error('Error actualizando proyecto:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar el proyecto.');
        }
    };

    const formatDate = (rawDate) => {
        /*Mediante ésta función, actualizamos los datos o información de las fechas agregando un formato
        específico, en éste caso, usaremos formato   dd/mm/aaaa */
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}/${month}/${year}`;
    }

    const onStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    console.log("Datos en media: ", media);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Editar Proyecto</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="pencil" style={styles.icon} />
                    <TextInput
                        placeholder="Nombre del Proyecto"
                        style={styles.input}
                        value={projectName}
                        onChangeText={setProjectName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="align-left" style={styles.icon} />
                    <TextInput
                        placeholder="Descripción"
                        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                {/* Meta de Financiamiento */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="dollar" style={styles.icon} />
                    <TextInput
                        placeholder="Meta de Financiamiento"
                        style={styles.input}
                        value={fundingGoal}
                        onChangeText={setFundingGoal}
                        keyboardType="numeric"
                    />
                </View>

                {/* Selector de Categoría */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="list" style={styles.icon} />
                    <Picker
                        selectedValue={category}
                        style={styles.picker}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        <Picker.Item label="Tecnología" value="Tecnología" />
                        <Picker.Item label="Cultura" value="Cultura" />
                        <Picker.Item label="Educación" value="Educación" />
                    </Picker>
                </View>

                {/* Fecha de Inicio */}
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.inputContainer}>
                    <FontAwesome name="calendar" style={styles.icon} />
                    <Text style={styles.dateText}>
                        {`Fecha de Inicio: ${startDate.toLocaleDateString()}`}
                    </Text>
                </TouchableOpacity>

                {/* Fecha de Fin */}
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.inputContainer}>
                    <FontAwesome name="calendar" style={styles.icon} />
                    <Text style={styles.dateText}>
                        {`Fecha de Fin: ${endDate.toLocaleDateString()}`}
                    </Text>
                </TouchableOpacity>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onStartDateChange}
                    />
                )}

                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={onEndDateChange}
                    />
                )}

                {/* Manejo de imágenes */}
                <TouchableOpacity onPress={handleMediaUpload} style={styles.mediaButton}>
                    <Text style={styles.mediaButtonText}>
                        {media.length > 0 ? 'Cambiar Imagen o Video' : 'Subir Imagen o Video'}
                    </Text>
                </TouchableOpacity>

                <ScrollView horizontal={true} style={styles.mediaPreviewContainer}>
                    {media.length > 0 && media.map((mediaItem, index) => (
                        <Image
                            key={index}
                            source={{ uri: mediaItem }}
                            style={styles.preview}
                        />
                    ))}
                </ScrollView>

                <TouchableOpacity onPress={handleUpdateProject} style={styles.button}>
                    <Text style={styles.buttonText}>Actualizar Proyecto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Estilos para la pantalla de edición de proyectos
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 40, // Para evitar que el contenido quede demasiado pegado al fondo
    },
    container: {
        width: '100%',
        backgroundColor: '#A8CEFF',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        color: '#FFF',
        margin: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        width: '80%',
        padding: 6,
        margin: 10,
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
    picker: {
        flex: 1,
        color: '#000',
    },
    dateText: {
        color: '#000',
        fontSize: 16,
    },
    mediaButton: {
        backgroundColor: '#75A1DE',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    mediaButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    mediaPreviewContainer: {
        marginVertical: 10,
        maxHeight: Dimensions.get('window').width * 0.5,
        width: '80%',
    },
    preview: {
        width: '100%',
        height: Dimensions.get('window').width * 0.5,
        borderRadius: 10,

        resizeMode: 'contain',
    },
    button: {
        width: '40%',
        marginVertical: 5,
        marginBottom: 100,
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

export default EditProjectPage;
