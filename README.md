Cosas pendientes

Backend
- Agregar las siguientes funcionalidades: 
- Categoria
* Las categorias solo se pueden ver, no se pueden crear o editar (GET)
* * (Posiblemente se implemente un usuario administrador donde un usuario normal, pide crear una categoría, y el tiene acceso a crearlas)

- Productos
* Los productos pueden ser vistos por todos

- Usuarios: 
* Alguien sin usuario, puede crearse uno
* Alguien sin usuario no puede comprar productos
* Funcionalidad de inicio de sesión para cada usuario creado (Esto va a ser un middleware, va a funcionar con jwt) (POST) (Listo)
* * Un usuario puede ver sus datos (GET) (Listo)
* * * Puede ver sus cuentas, sus tarjetas, sus movimientos y sus productos (Listo)

- Datos personales
* * El usuario logueado puede salir de la sesion (POST)
* * El usuario logueado puede crear cuentas (POST)
* * El usuario logueado hacer compras (movimientos) (POST)
* * * Los movimientos modifican los saldos de las tarjetas y el stock de productos (PUT)

- Datos de cuentas
* * Un usuario puede actualizar sus datos (PUT) 
* * Un usuario puede actualizar los datos de su cuenta (PUT) 
* * * Un usuario puede crear una tarjeta (POST) 
* * * Un usuario puede eliminar una tarjeta (DELETE) 

- Datos de productos 
* * Un usuario puede crear sus productos (POST) 
* * Un usuario puede modificar sus productos (PUT) 
* * * (Posiblemente cuando se modifique un producto, se registre un movimiento (PUT)) 
* * Un usuario puede borrar sus productos (DELETE) 

* * Un usuario puede borrar su cuenta (DELETE)
* * * Cuando borre su cuenta, tienen que borrarse su cuenta bancaria, su tarjeta y sus movimientos

Comandos: 
- Backend
    - npm run dev: ejecuta la apk
    - node index.js: ejecuta la apk en modo desarrollador.
- Averiguar si meter TEST unitarios al proyecto.
- Subir el proyecto a Render para la api
- Subir la base de datos a Railway.app


**Comandos**
Ejecutar la api
- npm run dev


***Migraciones y seeders***
Resetear la base de datos e inicializarla con los seeders
- npm run reset
