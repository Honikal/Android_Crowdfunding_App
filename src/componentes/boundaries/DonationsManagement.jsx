import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,

    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,

    Dimensions, 
    PixelRatio,

    TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importar FontAwesome para usar el icono de la lupa

//Importamos el controlador
import DonationsExtract_Ctrl from '../controllers/DonationsExtractController';

import { ScrollView } from "react-native-gesture-handler";

import UpTab from './styleComponents/UpTab';
import DownTab from './styleComponents/DownTab';

// Datos de prueba para los proyectos (puedes reemplazarlo con una llamada real a la API)

const DonationsManagement = ({ route }) => {
    const { usuarioActual } = route.params;

    const [listaDonaciones, setListaDonaciones] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    console.log("Info del usuario: ");
    usuarioActual.showData();

    useEffect(() => {
        const extraerDonaciones = async() => {
            const controlador = new DonationsExtract_Ctrl(usuarioActual);
            try {
                const donaciones = await controlador.extraerDonaciones();
                setListaDonaciones(donaciones);
            } catch (error) {
                console.error("Error en la capa de vista: ", error);
            }
        };
        extraerDonaciones();
    }, [usuarioActual]);

    const handleOutsidePress = () => {
        if (dropdownVisible) {
            console.log("Se desactiva la lista");
            setDropdownVisible(false);
        }
    };

    console.log("Datos de lista de donaciones: ", listaDonaciones);

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.fullPage}>
                <UpTab
                    usuarioActual={usuarioActual}
                    dropdownVisible={dropdownVisible}
                    setDropdownVisible={setDropdownVisible}
                />
            
                <View style={styles.container}>
                    {/* Listamos todas las donaciones*/}
                    {listaDonaciones.length === 0 ? (
                        <Text style={styles.noResults}>No existen donaciones en el sistema</Text>
                    ) : (
                        <ScrollView style={styles.scroller}>
                            {listaDonaciones.map((donaciones, index) => (
                                <View key={index} style={styles.donacionesContainer}>
                                    <FontAwesome name="file-text" style={styles.icon} />
                                    <View style={styles.infoDonationContainer}>
                                        <Text style={[styles.infoDonationText, styles.infoDescription]}>Proyecto al cual se donó: </Text>
                                        <Text style={styles.infoDonationText}>Fecha de donación: {donaciones.getFechaDonacion}</Text>
                                        <Text style={styles.infoDonationText}>Monto de donación: {donaciones.getMonto}$</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>

                <DownTab
                    usuarioActual={usuarioActual}
                    paginaActual={""}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    fullPage: {
        flex: 1
    },

    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    scroller: {
        flex: 1,
        width: '100%',
    },
    
    title: {
        fontSize: 20,
        color: '#0B3979',
        marginBottom: 20,
        marginTop: 100, // Ajuste para mover el título más abajo
    },
    
    icon: {
        fontSize: 20,
        color: '#000000', // Color del icono de la lupa
        marginLeft: 10, // Un pequeño margen izquierdo para separar la lupa del borde
    },

    noResults: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 20,
    },

    donacionesContainer: {
        flexDirection: 'row',

        width: '100%',
        
        marginVertical: normalize(6),
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(12),

        alignItems: 'center',

        backgroundColor: '#ECF7FD',

        borderRadius: normalize(30),
        borderWidth: 3,
        borderColor: '#0B3979',

        elevation: 5
    },
    
    infoDonationContainer: {
        flexDirection: 'column',
        marginLeft: normalize(24), 
    },
    infoDonationText: {
        flexWrap: 'wrap'
    },
    infoDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0B3979',
    },

    
    
});

export default DonationsManagement;
