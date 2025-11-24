# Documentación del Modelo de Datos (ERD)

## 1. Introducción

Este documento describe el modelo entidad--relación (ERD) utilizado para
representar las entidades principales del sistema y la forma en que
interactúan entre sí. Incluye entidades como **User**, **Movement**,
**MovementUser**, **Snapshot**, **Product**, **Account** y **Tarjet**,
junto con sus relaciones y cardinalidades.

------------------------------------------------------------------------

## 2. Entidades Principales

### User

Representa a cualquier usuario del sistema. Un usuario puede participar
en movimientos tanto como comprador como vendedor.

Atributos típicos: - `id` - `name` - `email` - `dni` - otros datos
personales

### Movement

Representa una transacción registrada por el sistema. Cada movimiento
está asociado a un producto, un monto, y guarda información operacional
del evento.

Atributos típicos: - `id` - `amount` - `quantity` - `timestamp` -
`productId`

### Product

Representa el producto involucrado en un movimiento.

Atributos: - `id` - `name` - `description` - `price` - `category`

### Account

Cuenta financiera del usuario.

Atributos: - `id` - `balance` - otros metadatos

### Tarjet

Tarjeta utilizada por el usuario para la operación.

Atributos: - `id` - `last4Digits` - otros datos protegidos

### MovementUser (Tabla puente)

Se utiliza para representar el rol del usuario en el movimiento
(comprador o vendedor).\
Esta tabla existe porque un movimiento siempre involucra exactamente
**dos usuarios**, pero en roles distintos.

Atributos: - `id` - `movementId` - `userId` - `role` (buyer / seller) -
`accountId` - `tarjetId`

### Snapshot

Guarda un "recorte" del estado del movimiento en un momento específico.\
*No lo llena el usuario*, lo genera el sistema automáticamente.

Atributos: - `id` - `movementId` - `dataJSON` - `createdAt`

------------------------------------------------------------------------

## 3. Relaciones

### User ↔ MovementUser

-   **Cardinalidad:** 1 usuario puede estar asociado a 0, 1 o muchos
    registros MovementUser.\
-   **Razón:** un usuario puede participar en muchos movimientos,
    incluso en diferentes roles.\
-   Relación: **1:N**

### Movement ↔ MovementUser

-   **Cardinalidad:** un movimiento tiene exactamente dos registros
    MovementUser (buyer y seller).\
-   Relación: **1:N**

### Movement ↔ Product

-   **Cardinalidad:** N movimiento → N producto.\
-   Relación: **N:N**

### Account ↔ MovementUser

-   Cada relación MovementUser referencia una única cuenta en el momento
    del movimiento.\
-   Relación: **1:1**

### Tarjet ↔ MovementUser

-   Similar a account: cada MovementUser almacena qué tarjeta se usó.\
-   Relación: **1:1**

### Movement ↔ Snapshot

-   Un movimiento va a tener si o si una snapshots (resultado de la operación).\
-   Relación: **1:1**

------------------------------------------------------------------------

## 4. Tabla puente: ¿Por qué existe MovementUser?

Porque un movimiento involucra **dos usuarios** simultáneamente.\
Si se guardara `buyerId` y `sellerId` directamente en `Movement`, se
rompería:

1.  Escalabilidad: no permite agregar más roles en el futuro.
2.  Normalización: se mezclarían responsabilidades.
3.  Integridad: si un usuario elimina su cuenta, no se quieren perder
    datos históricos.

------------------------------------------------------------------------

## 5. Snapshot: ¿Por qué es necesario?

Snapshot permite guardar un registro de: - estado del movimiento - datos
del producto - datos del vendedor y comprador - datos de cuenta y
tarjeta utilizadas.

Esencial para auditorías y peritajes.\
Además protege datos históricos aunque los usuarios eliminen o
modifiquen su información.

