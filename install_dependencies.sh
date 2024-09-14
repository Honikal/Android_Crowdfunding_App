#!/bin/bash

#Asegurar que npm y expo se instalan globalmente
echo "Instalando npm y expo"
npm install expo@latest

#Instalar dependencias locales del proyecto
echo "Instalando dependencias del proyecto"
npm install

#Iniciar el proyecto
echo "Ejecutando expo para iniciar proyecto"
npx expo start -c

