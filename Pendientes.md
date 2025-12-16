crear un .env en el front con rutas de hosteo y la ruta de la api junto con su template.
faltaria la documentacion del endpoint de movements


Cosas pendientes

Backend
- Agregar las siguientes funcionalidades: 
- Categoria
* Las categorias solo se pueden ver, no se pueden crear o editar (GET)
* * (Posiblemente se implemente un usuario administrador donde un usuario normal, pide crear una categoría, y el tiene acceso a crearlas)

- Productos
* Los productos pueden ser vistos por todos

- Usuarios:
* Alguien sin usuario no puede comprar productos

- Datos personales
* * El usuario logueado hacer compras (movimientos) (POST)
* * * Los movimientos modifican los saldos de las tarjetas y el stock de productos (PUT)

- Datos de cuentas
* * * Un usuario puede crear una tarjeta (POST) 
* * * Un usuario puede eliminar una tarjeta (DELETE) 

- Datos de productos 
* * Un usuario puede crear sus productos (POST) 
* * Un usuario puede modificar sus productos (PUT) 
* * * (Posiblemente cuando se modifique un producto, se registre un movimiento (PUT)) 
* * Un usuario puede borrar sus productos (DELETE) 


* * * Cuando un usuario borra su cuenta, tienen que borrarse su cuenta bancaria, su tarjeta y sus movimientos

Cosas a tener en cuenta:
- Estructura MVC (Modelo, vista, controlador)
- Separación en capas
- Manejo de roles y permisos de usuarios RBAC (Role-based access control)


Comandos: 
- Backend
    - npm run dev: ejecuta la apk
    - node index.js: ejecuta la apk en modo desarrollador.
- Averiguar si meter TEST unitarios al proyecto.
- Subir el proyecto a Render para la api
- Subir la base de datos a Railway.app

***Migraciones y seeders***
Resetear la base de datos e inicializarla con los seeders
- npm run reset
