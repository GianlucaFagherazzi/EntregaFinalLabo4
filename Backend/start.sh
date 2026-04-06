#!/usr/bin/env bash
set -e

echo "Esperando MySQL REAL..."

# 👇 usamos el script correcto
./wait-for-mysql.sh db

echo "Ejecutando migraciones..."
npm run migrate

echo "Ejecutando seeders..."
npm run seed || true

echo "Iniciando servidor..."
npm start