import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,

    Image,

    Dimensions
} from 'react-native';

//Controlador
import CreateProject_Ctrl from "../controllers/CreateProjectController";

//Componente de scroll vertical
import VerticalScroll from "./styleComponents/VerticalScroll";

// Importamos componentes para subir imágenes o videos
import * as ImagePicker from 'expo-image-picker';

// Importamos DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker'; 

// Importamos datos gráficos
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

// Tomando las dimensiones de la pantalla
const { width } = Dimensions.get('window');

//Sistema de navegación
import { useNavigation } from '@react-navigation/native';

const CreateProject = ( {route} ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;

    // Instanciamos la constante de navegación
    const navigation = useNavigation();

    // Variables de estado para el formulario
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");
    const [category, setCategory] = useState("Seleccionar Categoría");
    const [media, setMedia] = useState([]); // Para guardar la imagen o video seleccionado

    // Variables para la selección de fechas
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Función para manejar la selección de imágenes/videos
    const pickMedia = async () => {
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
            //Checamos si el archivo seleccionado es image o video
            const isImage = result.assets[0].type === "image";
            const isVideo = result.assets[0].type === "video";

            const newMedia = {
                uri: result.assets[0].uri, //Uri del archivo seleccionado
                type: isImage ? "image" : isVideo ? "video" : "unknown",
            };

            setMedia((prevMedia) => [...prevMedia, newMedia]); // Guardamos la URI del archivo seleccionado

            console.log("Si se guarda la imagen como tal: ", newMedia);
            console.log("Datos actualizados en sistema: ", media)
        }
    };

    // Función para convertir el date a tipo formato indicado
    const formatDate = (rawDate) => {
        /*Mediante ésta función, actualizamos los datos o información de las fechas agregando un formato
        específico, en éste caso, usaremos formato   dd/mm/aaaa */
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}/${month}/${year}`;
    }

    // Función para manejar el envío del formulario
    const handleSubmit = async() => {
        if (!projectName.trim() || !description.trim() || !fundingGoal.trim()
            || category === "Seleccionar Categoría") {
            Alert.alert('Campos obligatorios', 'Por favor complete todos los campos.');
            return;
        }

        try {
            // Aquí puedes agregar la lógica para guardar el proyecto en la base de datos

            //Extraemos la lista the uris de cada objeto de media
            const mediaUris = media.map(mediaItem => mediaItem.uri);
            
            const registrar = new CreateProject_Ctrl(usuarioActual.getIdUsuario, projectName, description,
                category, parseFloat(fundingGoal), formatDate(startDate), formatDate(endDate), mediaUris);

            const proyectoActual = await registrar.crearProyecto();
            
            //Para ver si tiene id de proyecto
            proyectoActual.showData();

            Alert.alert("Proyecto Creado", "El proyecto ha sido creado exitosamente.");

            navigation.navigate('Pagina Inicial', { usuarioActual: usuario });
        } catch (error) {
            console.error("Error durante creación del proyecto:", error.message);
            Alert.alert(error.message);
        }
        
    };

    // Funciones para manejar el DatePicker
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

    return (
        <VerticalScroll>
            <View style={styles.container}>
                <Text style={styles.title}>Crear Nuevo Proyecto</Text>

                <View style={styles.inputContainer}>
                    <FontAwesome name="pencil" style={styles.icon} />
                    <TextInput
                        placeholder="Nombre del Proyecto"
                        placeholderTextColor={'#D9D5D5'}
                        style={styles.input}
                        value={projectName}
                        onChangeText={setProjectName}
                        maxLength={60}
                    />
                    <Text style={styles.characterCount}>{projectName.length}/60</Text>
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="align-left" style={styles.icon} />
                    <TextInput
                        placeholder="Descripción del Proyecto"
                        placeholderTextColor={'#D9D5D5'}
                        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        maxLength={135}
                    />
                    <Text style={styles.characterCount}>{description.length}/135</Text>
                </View>

                {/* Selector de Categoría */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="list" style={styles.icon} />
                    <Picker
                        selectedValue={category}
                        style={styles.picker}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        <Picker.Item label="Seleccionar Categoría" value="Seleccionar Categoría" />
                        <Picker.Item label="Tecnología" value="Tecnología" />
                        <Picker.Item label="Cultura" value="Cultura" />
                        <Picker.Item label="Educación" value="Educación" />
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="dollar" style={styles.icon} />
                    <TextInput
                        placeholder="Meta de Financiamiento"
                        placeholderTextColor={'#D9D5D5'}
                        style={styles.input}
                        value={fundingGoal}
                        onChangeText={setFundingGoal}
                        keyboardType="numeric"
                    />
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

                <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
                    <Text style={styles.mediaButtonText}>
                        {media ? 'Cambiar Imagen o Video' : 'Subir Imagen o Video'}
                    </Text>
                </TouchableOpacity>
                
                <ScrollView horizontal={true} style={styles.mediaPreviewContainer}>
                    {media.length > 0 && media.map((mediaItem, index) => {
                        return mediaItem.type === "image" ? (
                            <Image
                                key={index}
                                source={{ uri: mediaItem.uri }}
                                style={styles.preview}
                            />
                        ) : mediaItem.type === "video" ? (
                            <Image
                            />
                        ) : null;
                    })}
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Crear Proyecto</Text>
                </TouchableOpacity>
            </View>
        </VerticalScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexGrow: 1,
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
    picker: {
        flex: 1,
        color: '#000',
    },
    icon: {
        fontSize: 24,
        padding: 8,
        color: '#c4c4bc',
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
        maxHeight: width * 0.5,
    },
    preview: {
        width: width * 0.8,
        height: width * 0.5,
        borderRadius: 10,
        marginTop: 15,
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
    characterCount: {
        color: '#D9D5D5',
        fontSize: 12,
        position: 'absolute',
        right: 15,
        bottom: 5,
    }
});

export default CreateProject;
