import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    StyleSheet,
    
    Dimensions,
    PixelRatio,
} from 'react-native'

//Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";

//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'

const InitialPage = ( { route } ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;


    //Instanciamos la constante de navegación
    const navigation = useNavigation();


    //Checar que se estén cargando los datos en el sistema en la página
    return(
        <View>
            <UpTab
                usuarioActual={usuarioActual}
            />
            <View style={styles.container}>
                <Text>Pagina Inicial</Text>
            </View>
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
    upTab: {
        //Orden del campo
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '11%',
        width: '100%',

        paddingHorizontal: 20,
        paddingVertical: 10,
        zIndex: 10,   //Hacemos que siempre se coloca arriba

        //Colores como tal y bordes
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',

        //Android shadow
        elevation: 10,

        //Ios shadow
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 4
    },


    container: {
      width: '100%',
      flexGrow: 1,
      backgroundColor: '#A8CEFF',
      alignItems: 'center',
      justifyContent: 'center',
    },

});

export default InitialPage;
