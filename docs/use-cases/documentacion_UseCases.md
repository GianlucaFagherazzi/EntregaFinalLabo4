# Documentación de Casos de Uso  
## Sistema de compra y ventas online

---

## Descripción general del sistema
El **Sistema de compra y ventas online** es una plataforma digital que permite la interacción entre usuarios que desean comprar y vender productos mediante transacciones electrónicas.  
Los usuarios pueden publicar artículos, modificar publicaciones, ver productos disponibles, gestionarlos y realizar pagos en línea de manera segura.

El sistema brinda una experiencia integrada en la que una persona usuaria puede adoptar dos roles: **vendedor**, para ofrecer productos al público; y **comprador**, para adquirir productos mediante una operación comercial protegida mediante validación de stock, saldo y registro histórico de movimientos.

---

## Actores

| Actor | Descripción |
|-------|-------------|
| **User Buyer (Comprador)** | Usuario que navega, consulta productos y puede iniciar transacciones de compra. |
| **User Seller (Vendedor)** | Usuario que publica y gestiona productos para la venta. |

---

## Reglas de negocio

1. **El pago no se puede procesar si no se valida el saldo.**
2. **La publicación de productos solo puede realizarla un vendedor registrado.**
3. **El comprador puede ver únicamente los registros de compra asociados a sus transacciones.**

---

## Casos de Uso

A continuación, se documentan los casos de uso identificados en el sistema.

---

## **CU 01 – Iniciar Sesión**

**Descripción:** Permite al usuario autenticarse para acceder al sistema.  
**Actores:** User Buyer / User Seller

### 🔹 Precondiciones
- El usuario debe estar registrado en el sistema.
- Los datos ingresados deben existir en la base de datos.

### 🔹 Postcondiciones
- El usuario queda autenticado y con acceso a sus funcionalidades correspondientes según su rol.

### 🔹 Flujo Principal
1. El usuario ingresa correo y contraseña.
2. El sistema valida los datos existentes.
3. El usuario accede al sistema.

### 🔹 Flujo Alternativo
| Nº | Variación | Resultado |
|----|----------|-----------|
| A1 | Datos inválidos o inexistentes | Se rechaza el acceso y se solicita reingreso. |

---

## **CU 02 – Validar Datos Existentes**

**Descripción:** Corrobora la existencia y coincidencia de credenciales de un usuario.  
**Actores:** Sistema

### Precondiciones
- El usuario debe haber ingresado sus datos de login.

### Postcondiciones
- Se informa si la autenticación es correcta o incorrecta.

### Flujo Principal
1. Recibir datos del usuario.
2. Comparar con la base de datos.
3. Notificar resultado.

---

## **CU 03 – Modificar Datos Personales**

**Descripción:** Permite a un usuario modificar su información personal registrada.  
**Actores:** User Buyer / User Seller

### Precondiciones
- El usuario debe haber iniciado sesión.

### Postcondiciones
- Los datos modificados quedan almacenados.

### Flujo Principal
1. El usuario selecciona la opción de editar perfil.
2. Introduce los nuevos datos.
3. El sistema guarda la información.

### Flujo Alternativo
| Nº | Variación | Resultado |
|----|-----------|-----------|
| A1 | Datos inválidos o incompletos | Se notifica error y se solicita corrección. |

---

## **CU 04 – Ver / Escoger Producto**

**Descripción:** El comprador visualiza detalles de productos disponibles y selecciona uno para continuar con la compra.  
**Actores:** User Buyer

### Precondiciones
- Debe existir catálogo de productos publicados.

### Postcondiciones
- El producto queda seleccionado.

### Flujo Principal
1. El comprador visualiza la lista de productos.
2. Selecciona un producto para inspeccionar.
3. Confirma el producto para avanzar con la compra.

---

## **CU 05 – Elegir Cuenta y Tarjeta de Pago**

**Descripción:** El comprador selecciona el método de pago a utilizar.  
**Actores:** User Buyer

### Precondiciones
- El usuario debe haber iniciado sesión.
- Debe haber seleccionado un producto.

### Postcondiciones
- Queda definido el método de pago para la transacción.

### Flujo Principal
1. El comprador accede al menú de métodos de pago.
2. Selecciona cuenta o tarjeta.
3. Confirma el medio.

---

## **CU 06 – Validar Stock**

**Descripción:** El sistema verifica la disponibilidad del producto antes de procesar el pago.  
**Actores:** User Buyer (indirecto), Sistema

### Precondiciones
- Debe haberse seleccionado un producto.

### Postcondiciones
- Se determina si el producto tiene stock suficiente.

### Flujo Principal
1. Consultar stock del producto.
2. Confirmar disponibilidad.

### Flujo Alternativo
| Nº | Variación | Resultado |
|----|-----------|-----------|
| A1 | Stock insuficiente | Se cancela la operación de compra. |

---

## **CU 07 – Validar Saldo**

**Descripción:** Verifica si el comprador posee fondos suficientes en el medio de pago seleccionado.  
**Actores:** User Buyer (indirecto), Sistema

### Precondiciones
- El comprador debe haber elegido medio de pago.

### Postcondiciones
- Se autoriza o rechaza la continuidad del pago.

### Flujo Alternativo
| Nº | Variación | Resultado |
|----|-----------|-----------|
| A1 | Saldo insuficiente | No se habilita la compra. |

---

## **CU 08 – Pagar Producto**

**Descripción:** El comprador completa la transacción de compra del producto.  
**Actores:** User Buyer

### Precondiciones
- Stock validado.
- Saldo validado.

### Postcondiciones
- Se genera la compra.
- El sistema envía orden a movimiento contable.

### Flujo Principal
1. El comprador confirma la compra.
2. Se descuenta el saldo.
3. Se descuenta el stock.
4. Se genera movimiento contable.

---

## **CU 09 – Generar Movimiento**

**Descripción:** El sistema registra contablemente la transacción de compra.  
**Actores:** Sistema

### Precondiciones
- Debe haberse ejecutado un pago exitoso.

### Postcondiciones
- Se registra movimiento en historial.

---

## **CU 10 – Ver Registro de Compra (Snapshot)**

**Descripción:** Permite al comprador y al vendedor ver el historial de compras  o ventas realizadas.  
**Actores:** User Buyer y User Seller

### Precondiciones
- El usuario debe haber iniciado sesión.

### Postcondiciones
- El usuario visualiza su registro histórico de compras o ventas (según el rol que este tenga).

### Flujo Principal
1. El usuario accede a “Mis movimientos”.
2. El sistema lista historial.
3. El usuario puede ver detalles de cada operación.

---

## **CU 11 – Publicar Producto**

**Descripción:** El vendedor publica un producto para ofrecerlo a la venta.  
**Actores:** User Seller

### Precondiciones
- Debe haber iniciado sesión como vendedor.

### Postcondiciones
- El producto queda visible para todos los compradores.

### Flujo Principal
1. El vendedor introduce información del producto.
2. El sistema valida la integridad de los datos.
3. El producto queda publicado.

---

## **CU 12 – Modificar Producto**

**Descripción:** Permite al vendedor editar una publicación existente.  
**Actores:** User Seller

### Precondiciones
- El vendedor debe haber iniciado sesión.
- El producto debe pertenecer al vendedor.

### Postcondiciones
- La publicación queda actualizada.



