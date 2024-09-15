import React, { useState, useEffect } from "react";
import{
    View,
    Text,

    StyleSheet,
    
    Dimensions,
    PixelRatio,

    TouchableWithoutFeedback
} from 'react-native'

//Importamos el tab superior de la pantalla
import UpTab from "./styleComponents/UpTab";
import DownTab from "./styleComponents/DownTab";

import Header from "./styleComponents/Header";



//Importamos el sistema de navegación
import { useNavigation, useIsFocused } from '@react-navigation/native'

const InitialPage = ( { route } ) => {
    //Recibimos el parámetro como tal
    const { usuarioActual } = route.params;

    //Agregamos el state del dropdown y su visibilidad desde acá
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //Instanciamos la constante de navegación
    const navigation = useNavigation();

    //Función encargada de manejar cuando un usuario da click fuera del dropdown
    const handleOutsidePress = () => {
        if (dropdownVisible){
            console.log("Se desactiva la lista");
            setDropdownVisible(false); //Se cierra cuando se da click afuera
        }
    }

    //Checar que se estén cargando los datos en el sistema en la página
    return(
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View> 
                <UpTab
                    usuarioActual={usuarioActual}
                    dropdownVisible={dropdownVisible}        //Pasamos la variable al UpTab
                    setDropdownVisible={setDropdownVisible}  //Pasamos el setter al UpTab
                />
                {/*<Header></Header>*/}
                <View style={styles.container}>
                    <Text>Pagina Inicial</Text>
                </View>

                <DownTab
                    usuarioActual={usuarioActual}
                    paginaActual={"Pagina Inicial"}
                />
            </View>
        </TouchableWithoutFeedback>
        

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

export default InitialPage;
