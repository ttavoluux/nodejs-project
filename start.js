#!/bin/bash

# Verificar si existe package.json en el directorio actual
if [ ! -f "package.json" ]; then
  echo "No se encuentra package.json en este directorio. Asegúrate de estar en la ruta correcta."
  exit 1
fi

# Ejecutar npm install
echo "Instalando dependencias..."
npm install

# Verificar si npm install fue exitoso
if [ $? -ne 0 ]; then
  echo "Hubo un error al instalar las dependencias."
  exit 1
fi

# Ejecutar npm run qr
echo "Ejecutando npm run qr..."
npm run qr

# Verificar si npm run qr fue exitoso
if [ $? -ne 0 ]; then
  echo "Hubo un error al ejecutar 'npm run qr'."
  exit 1
fi

echo "El despliegue se completó con éxito."
