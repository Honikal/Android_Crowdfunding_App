#!/bin/bash

#Asegurar que npm y expo se instalan globalmente
echo "Instalando npm y expo"
npm install -g expo-cli

#Instalar dependencias locales del proyecto
echo "Instalando dependencias del proyecto"
npm install

#Instalar librerías de routing conocidas (que permitan routing en la aplicación)
echo "Instalando librerías que permitan routing en aplicación"
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

#Iniciar el proyecto
echo "Ejecutando expo para iniciar proyecto"
npm start

