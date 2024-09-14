import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    StyleSheet,
    
    Dimensions,
    PixelRatio,
} from 'react-native'

//Importamos el tab superior de la pantalla

//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'

const SearchPage = ( { route } ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;

    //Instanciamos la constante de navegación
    const navigation = useNavigation();


    //Checar que se estén cargando los datos en el sistema en la página
    return(
        <View style={styles.container}>
            <Text>Pagina Busqueda</Text>
        </View>
    )
}

//Responsive code?
const {width, height} = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#A8CEFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default SearchPage;
