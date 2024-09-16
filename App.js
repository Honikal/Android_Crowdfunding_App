import { StatusBar } from 'expo-status-bar';

// Páginas de enrutamiento
import Login from './src/componentes/boundaries/Login';
import SignUp from './src/componentes/boundaries/SignUp';
import InitialPage from './src/componentes/boundaries/InitialPage';
import ModifyAccount from './src/componentes/boundaries/ModifyAccount';
import SearchPage from './src/componentes/boundaries/SearchPage';
import NewProjectPage from './src/componentes/boundaries/NewProjectPage';
import EditProject from './src/componentes/boundaries/EditProjectPage';
import UserManagement from './src/componentes/boundaries/UserManagement';
import NotificationSettings from './src/componentes/boundaries/ConfigurationsPage';  // Importa la nueva pantalla
import ProjectDetail from './src/componentes/boundaries/ProjectDetail';  // Importa la nueva pantalla
import MyProjects from './src/componentes/boundaries/MyProjects';
import Donate from './src/componentes/boundaries/Donate';

// Sistema para implementar navegación
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Registrar'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Pagina Inicial'
          component={InitialPage}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />
        <Stack.Screen
          name='Modificar Cuenta'
          component={ModifyAccount}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />
        <Stack.Screen
          name='Busqueda'
          component={SearchPage}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />
        <Stack.Screen
          name='Gestionar Usuario'
          component={UserManagement}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />
        <Stack.Screen
          name='Crear Proyecto'
          component={NewProjectPage}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />
        <Stack.Screen
          name='Editar Proyecto'
          component={EditProject}
          options={{ headerShown: false }}
          initialParams={{
            usuarioActual: null,
            proyectoActual: null
          }}
        />
        {/* Añade la nueva pantalla para configuración de notificaciones */}
        <Stack.Screen
          name='Configuraciones'
          component={NotificationSettings}
          options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Detalle Proyecto"
            component={ProjectDetail}
            options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Mis Proyectos'
          component={MyProjects}
          options={{ headerShown: false }}
          initialParams={{ usuarioActual: null }}
        />

        <Stack.Screen
          name='Donar'
          component={Donate}
          options={{ headerShown: false }}
          initialParams={{ proyectoActual: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
