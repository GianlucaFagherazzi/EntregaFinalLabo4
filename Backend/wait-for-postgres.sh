#!/usr/bin/env bash
set -e

host="$1"

until pg_isready -h "$host" -p 5432 -U postgres; do
  echo "Esperando a PostgreSQL..."
  sleep 2
done

echo "PostgreSQL está listo!"