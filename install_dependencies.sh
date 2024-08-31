#!/bin/bash

#Instalar dependencias locales del proyecto
echo "Instalando dependencias del proyecto"
npm install

#Asegurar que npm y expo se instalan globalmente
echo "Instalando npm y expo"
npm install -g expo-cli

#Cambiar directorio de proyecto
#echo "Cambiando el directorio del proyecto"
#cd $(dirname "$0") || { echo "Error al cambiar el directorio"; exit 1;}

#Instalar librerías de routing conocidas (que permitan routing en la aplicación)
echo "Instalando librerías que permitan routing en aplicación"
npx expo install react-native-screens react-native-safe-area-context

#Iniciar el proyecto
echo "Ejecutando expo para iniciar proyecto"
npm start

