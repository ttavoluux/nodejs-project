#!/bin/bash

# Ruta de la carpeta
CARPETA="GataBotSession"

# Comprobar si la carpeta existe
if [ -d "$CARPETA" ]; then
  # Eliminar todos los archivos y subcarpetas de la carpeta, excepto creds.json
  find "$CARPETA" -mindepth 1 ! -name "creds.json" -exec rm -rf {} +
  echo "Se han borrado todos los archivos de la carpeta $CARPETA excepto creds.json."
else
  echo "La carpeta $CARPETA no existe."
fi
