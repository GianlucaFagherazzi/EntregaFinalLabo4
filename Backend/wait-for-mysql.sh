#!/usr/bin/env bash
set -e

host="$1"

until mysqladmin ping -h "$host" --silent; do
  echo "Esperando a MySQL..."
  sleep 2
done

echo "MySQL está listo!"