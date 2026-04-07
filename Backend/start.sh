#!/usr/bin/env bash
set -e

echo "Esperando PostgreSQL..."

./wait-for-postgres.sh db

echo "Ejecutando migraciones..."
npm run migrate

echo "Ejecutando seeders..."
npm run seed || true

echo "Iniciando servidor..."
npm start