#Instalar las librerías y programas necesarios
PROYECTO='Android_Crowdfunding_App'

#Cambiar directorio a proyecto
cd $PROYECTO || { echo "Error al cambiar de directorio"; exit 1; } 
echo "Cambiando a directorio de aplicación"

#Instalar npm y expo globalmente
echo "Instalando npm expo"
npm install -g expo-cli

#Sleep por 5 segundos para asegurar instalación global completada
sleep 5

#Iniciar proyecto como expo
echo "Iniciar proyecto con expo (elegir plantilla recomendada)"
expo init . --template blank

#Sleep por 5 segundos para asegurar que el proyecto esté inicializado
sleep 5

#Instalar dependencias de proyecto local
echo "Installing project dependencies"
npm install

#Sleep por 15 segundos para asegurar instalación de dependencias
sleep 5

#Instalar librería de routing conocida
echo "Instalando librerías de routing"
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

#Sleep por 10 segundos para asegurar las librerías estén instaladas
sleep 10

#Iniciar proyecto
echo "Iniciando proyecto"
npm start &

#Dormir por 8 segundos para dar al proyecto tiempo de instalación
#npm run android

