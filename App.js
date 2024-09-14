import { StatusBar } from 'expo-status-bar';

//Páginas de enrutamiento
import Login from './src/componentes/boundaries/Login';
import SignUp from './src/componentes/boundaries/SignUp';
import InitialPage from './src/componentes/boundaries/InitialPage';

//Sistema para implementar navegación
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Registrar'
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Pagina Inicial'
          component={InitialPage}
          options={{headerShown: false}}
          initialParams={{ usuarioActual: null }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


