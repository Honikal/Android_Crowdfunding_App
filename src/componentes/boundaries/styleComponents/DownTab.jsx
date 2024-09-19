import React, {useState} from "react";
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

    //Usado para hacer que luzca igual en todos los dispositivos
    Dimensions,
    PixelRatio
} from 'react-native'

//Importamos el método de navegación
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'

export default DownTabProyecto = ({ usuarioActual, paginaActual }) => {
    //Insertamos la constante de navegación
    const navigation = useNavigation();

    console.log("La página actual es: ", paginaActual);

    const navegarPaginaInicial = async() => {
        if (paginaActual !== 'Pagina Inicial'){
            navigation.navigate('Pagina Inicial', { usuarioActual: usuarioActual, });               
        }
    }

    const navegarBusqueda = async() => {
        if (paginaActual !== 'Busqueda'){
            navigation.navigate('Busqueda', { usuarioActual: usuarioActual });
        }
    }

    const navegarCrearProyecto = async() => {
        if (paginaActual !== 'Crear Proyecto'){
            navigation.navigate('Crear Proyecto', { usuarioActual: usuarioActual, });
        }
    }

    return (
        <View style={styles.downTab}>
            <TouchableOpacity style={[styles.availableBoton, paginaActual === 'Pagina Inicial' && styles.disabledBoton]}
            onPress={navegarPaginaInicial}>
                <FontAwesome name="home" style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.availableBoton, paginaActual === 'Busqueda' && styles.disabledBoton]} 
            onPress={navegarBusqueda}>
                <FontAwesome name="search" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.availableBoton, paginaActual === 'Crear Proyecto' && styles.disabledBoton]} 
            onPress={navegarCrearProyecto}>
                <FontAwesome name="plus-square" style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

//Variables usadas para detalles como manejo gráfico y disponibilidad en todos los dispositivos
const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const styles = StyleSheet.create({
    //Sección tab arriba
    downTab: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',

        alignItems: 'center',
        
        borderWidth: 1,
        borderTopColor: '#B1D6ED',
        backgroundColor: '#ECF7FD',
        

        //Android shadow
        elevation: 10,

        //Ios shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 4
    },

    availableBoton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.3%',
        height: '100%',
        opacity: 0.5
    },
    disabledBoton: {
        opacity: 1
    },
    icon: {
        fontSize: 30,
        padding: 4,
        color: '#75A1DE'
    },
})

