# TRABAJO FINAL LABORATORIO IV - GIANLUCA FAGHERAZZI & TELEZ LEONARDO

# TABLA DE CONTENIDO
- [Introduccion](#Introducción)
- [Instalacion](#Instalación)
- [Ejecucion](#Ejecución)
- [Backend&Database](#Backend&Database)
- [Endpoints](#Endpoints)
- [Flujo_de_Logica](#Flujo_de_Logica)
- [Flujo_de_un_endpoint](#Flujo_de_un_endpoint)

## INTRODUCCIÓN
Este proyecto consiste en el desarrollo de una aplicación web orientada a la compra y venta de productos, implementada bajo una arquitectura cliente-servidor. El backend fue desarrollado como un servicio REST, encargado de la gestión de usuarios, productos, cuentas y operaciones asociadas, mientras que el frontend permite la interacción del usuario a través de una interfaz gráfica intuitiva y dinámica.

La aplicación contempla funcionalidades como el registro e inicio de sesión de usuarios, la visualización y administración de productos, la gestión de cuentas personales, y operaciones básicas asociadas a dichas cuentas. Asimismo, se implementan mecanismos de autenticación y autorización mediante tokens, garantizando la seguridad en las operaciones sensibles del sistema.

El sistema simula el funcionamiento básico de una plataforma de comercio electrónico, permitiendo a los usuarios interactuar tanto como compradores como vendedores. En futuras versiones se prevé la incorporación de nuevas funcionalidades, tales como mejoras en la gestión de ventas, favoritos, reportes y optimización de la experiencia de usuario.

## INSTALACIÓN
Para ejecutar este proyecto, es necesario contar con un entorno de desarrollo preparado para el frontend.

Una vez descargado el proyecto, desde la carpeta correspondiente al frontend se deben instalar las dependencias ejecutando el siguiente comando en la terminal backend y en la terminal frontend:
- npm install
- npm run reset

Posteriormente se debra configurar el .env en el cual debera introducir la configuracion de acceso de su base de datos mySQL, y se debara configurar la ruta de acceso de la api y su password de acceso para el JWT (utilizar template de referencia).


## EJECUCIÓN

Luego para iniciar la aplicacion, ejecutar el siguiene comando en la terminal backend y en la terminal frontend:
- npm run dev

La aplicación frontend quedara disponible por defecto en:
- 🌐 http://localhost:5173
- 🧪 Postman

## BACKEND & DATABASE
El backend expone una API REST que se encuentra desplegada en la web y conectada a una base de datos remota.
Dicha API es consumida exclusivamente por el frontend de la aplicación o mediante herramientas de prueba como Postman, no requiriendo instalación ni ejecución local para su funcionamiento.

## ENDPOINTS
## 1. obtener todos los usuarios
Acutalmente desde el frontend cualquiera puede acceder a la lista de todos los usuarios, pero en el futuro esta funcion solamente la tendra el usuario administrador de la pagina.

Si se accede desde Postman, el Endpoint es el siguiente:

  - GET /api/users

  - ### Respuesta esperada

    Devuelve una lista con todos los usuarios registrados.

## 2. crear usuario
Desde el frontend se podra realizar esta operación mediante el boton registrarse.
Si se accede desde Postman, el endpoint es el siguiente.

  - POST /api/users

  - ### Campos del JSON

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | dni | String | ✅ | DNI del usuario |
    | name | String | ✅ | Nombre |
    | username | String | ✅ | Apellido |
    | email | String | ✅ | email del usuario |
    | password | String | ✅ | contraseña |

  - ### Valores válidos para password y dni
    Las contraseñas pueden tener cualquier tipo de caracter, la unica limitacion es que deben tener un maximo de 8 caracteres.
    Los DNI aunque son string, deben ser introducidos como números de 8 caracteres positivos.

  - ### Ejemplo

    ``` json
    {
      "dni": "10000011",
      "name": "Leonardo",
      "surname": "Telez",
      "email": "leo@gmail.com",
      "password": "prueba desde postman"
    }
    ```

## 3. obtener usuario por ID

  - **Endpoint:**   GET /api/users/{id}

  - ### Respuesta esperada

    Devuelve todos los datos del usuario registrado.

## 4. "eliminar" usuario
Por razones de integridad de la información y prevención de errores, los usuarios no pueden ser eliminados permanentemente del sistema. Los datos asociados a los usuarios son utilizados por otras entidades dentro del sistema, y su pérdida podría generar inconsistencias. En lugar de realizar una eliminación física de los registros, se emplea un soft delete, el cual consiste en modificar el valor de un atributo del usuario, sin eliminar sus datos. En este caso, se cambia el valor del atributo "isActive" de true a false, lo que desactiva la cuenta del usuario y le impide acceder a ella. Sin embargo, los datos del usuario permanecen almacenados en la base de datos, garantizando la preservación de la información para futuros análisis o referencias.

Para realizar esta operacion desde el backend se puede hacer por medio del boton eliminar cuenta, presente en la pagina profile.

Desde postman se puede realizar a travez del siguiente endpoint: PUT /api/users/{serId}/deactivate

## 5. obtener todas las cuentas
  Esto permitirá obtener un listado de todas las cuentas bancarias que hay registradas en el sistema. El resultado será una lista en la que se mensionara el:
  - ID de la cuenta.
  - cbu.
  - Estado: si la cuenta esta activa será (true) si está desactivada será (false).

  Para acceder desde postman es a travez del siguiente endpoint:
  - POST /api/accounts

## 6. obtener una cuenta por ID

  - **Endpoint:**   GET /api/accounts/{id}

  - ### Respuesta esperada

    Devuelve todos los datos de la cuenta registrada.

## 7. Crear una cuenta
  Desde el frontend se podra crear una cuenta desde la pagina accecible a travez del menú desplegable del usuario.
  Desde postman se podra crear desde el siguiente endpoint:
  - POST /api/accounts

  - ### Campos del JSON
  Desde el front el cbu se generará de forma aleatoria, pero desde Postman el usuario deberá introducir un número de 12 digitos.

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | cbu | string | ✅ | cbu de identificación |
    | userId | int | ✅ | Id del usuarios dueño de la cuenta |

  - ### Ejemplo

    ``` json
    {
      "cbu": "123456789123",
      "userId": 1
    }
    ```

## 8. eliminar una cuenta
Al igual que ocurre con los usuarios, las cuentas no pueden eliminarse de forma definitiva por razones de integridad de los datos. Por este motivo, se utiliza nuevamente el soft delete, que consiste en cambiar el valor del atributo isActive de la cuenta de true a false. De esta manera, la cuenta queda inhabilitada sin perder la información asociada.

Esta accion por el momento solo se puede realizar a traves de Postman con el siguiente endpoint: PUT /api/accounts/{accountId}/deactivate

## 9. obtener todas las tarjetas
  Esto solo es posible desde Postman a travez del siguiente endpoint:
  - GET /api/tarjets

  - ### Respuesta esperada

    Devuelve una lista con todas las tarjetas registradas indicando su estado (activa/desactivada) y el id del usuario al que pertenece.

## 10. Crear una tarjeta
  - - **Endpoint:**   POST /api/tarjets

  - ### Campos del JSON

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | number | string | ✅ | numero de identificación |
    | balance | int | ✅ | monto inicial |
    | accountId | int | ✅ | Id de la cuenta |

  - ### Valores válidos para number
    El número de tarjeta a pesar de que estan declarados como string, cuando se crea, debe ser un numero entero de 16 digitos

  - ### Valor valido para accountId
    El id de cuenta debe pertenecer a una cuenta existente. No se podrá crear una tarjeta asociada a una cuenta inexistente.

  - ### Ejemplo

    ``` json
    {
      "number": "1111222233337536",
      "balance": 100,
      "accountId": 1
    }
    ```

# 11. eliminar una tarjeta
Las tarjetas tampoco se eliminan de forma definitiva del sistema, ya que su información puede estar vinculada a movimientos y otras entidades. Para preservar la integridad de los datos, se aplica un soft delete que cambia el atributo isActive de true a false, dejando la tarjeta inhabilitada sin perder su información.

Por el momento esta acción solo es posible desde Postman a traves del siguiente endpoint:  PUT /api/tarjets/{tarjetId}/deactivate

## 12. obtener todos los productos

  - **Endpoint:**   GET /api/products

  - ### Respuesta esperada

    Devuelve una lista con todos los productos publicados por usuarios registrados.

## 13. crear un producto
  
  - **Endpoint**    POST /api/products

  - ### Campos del JSON

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | name | string | ✅ | nombre |
    | description | int | ❌ | descrición |
    | price | int | ✅ | precio unitario |
    | stock | int | ✅ | stock disponible |
    | userId | int | ✅ | Id del usuario (vendedor) |
    | categoryId | int | ✅ | Id de la categoria |

  - ### Coasa a tener en cuenta
    La descripción del producto NO es obligatoria, es opcional.
    Los datos de (userId y de categoryId) deben existir.

  - ### Ejemplo

    ``` json
    {
      "name": "remeras",
      "description": "",
      "price": 500,
      "stock": 100,
      "userId": 1,
      "categoryId": 1
    }
    ```
## 14. eliminar un producto
Los productos tampoco se eliminan de forma definitiva del sistema, ya que su información puede estar vinculada a ventas, movimientos u otras entidades. Para preservar la integridad de los datos, se aplica un soft delete que cambia el atributo isActive de true a false, dejando el producto inhabilitado sin perder su información.

Por el momento esta acción solo es posible desde Postman a traves del siguiente endpoint:  PUT /api/products/{productId}/deactivate

## 15. obtener todas las categorias

  - **Endpoint:**   GET /api/categories

  - ### Respuesta esperada

    Devuelve una lista con todas las categorias registradas.

## 16. crear una categoria
  
  - **Endpoint**    POST /api/categories

  - ### Campos del JSON

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | name | string | ✅ | nombre |

  - ### Ejemplo

    ``` json
    {
      "name": "ropa"
    }
    ```
## 17. eliminar una categoria
Las categoria a diferencia de las demas entidades si pueden ser eliminadas de forma permanente, ya que no representa ningun riego para la integridad.

Por el momento esta acción solo es posible desde Postman a traves del siguiente endpoint:  DELETE /api/categories/{categoryId}

## 18. obtener todos los movimientos

  - **Endpoint:**   GET /api/movements

  - ### Respuesta esperada

    Devuelve una lista con todos los movimietnos (transacciones) realizadas por usuarios registrados.

## 19. crear un movimiento
  
  - **Endpoint**    POST /api/movements

  - ### Campos del JSON

    | Campo | Tipo | Obligatorio | Descripción |
    |--------|------|-------------|-------------|
    | name | string | ✅ | nombre |
    | description | int | ❌ | descrición |
    | price | int | ✅ | precio unitario |
    | stock | int | ✅ | stock disponible |
    | userId | int | ✅ | Id del usuario (vendedor) |
    | categoryId | int | ✅ | Id de la categoria |

  - ### Coasa a tener en cuenta
    La descripción del producto NO es obligatoria, es opcional.
    Los datos de (userId y de categoryId) deben existir.

  - ### Ejemplo

    ``` json
    {
      "name": "remeras",
      "description": "",
      "price": 500,
      "stock": 100,
      "userId": 1,
      "categoryId": 1
    }
    ```


## FLUJO DE LÓGICA DEL BACKEND
 El backend sigue una arquitectura en capas, inpirada de aplicaciones REST con Node.js + Express + Sequelize.
 Está escho de esta manera, porque de esta forma permite una correcta separación de responsabilidades, facilitando el mantenimiento, la escalabilidad y la comprensión del sistema.

 El flujo general de una solicitud dentro del backend es el siguiente:

 Request → Routes → Middlewares → Controllers → Services → Models → Base de datos → Response

 A continuacion se desscribe el rol de cada componente dentro de la estructura del proyecto.
     
    Punto de entrada

    El archivo index.js es el punto de inicio de la aplicación. Allí se configura el servidor Express, se cargan los middlewares globales (como el manejo de JSON y CORS), se registran las rutas principales y se inicia la escucha del servidor en el puerto configurado mediante variables de entorno.
__    

    Configuración (src/config)

    Este directorio contiene toda la configuración general de la aplicación, incluyendo la conexión a la base de datos mediante Sequelize, parámetros de seguridad y otras configuraciones necesarias para el correcto funcionamiento del backend.
__

    Rutas (src/routes)

    Las rutas definen los endpoints REST disponibles en la aplicación. Cada ruta se encarga únicamente de recibir la solicitud HTTP y redirigirla al controlador correspondiente. En esta capa no se implementa lógica de negocio.

    Ejemplo de endpoints:

    Creación y gestión de usuarios

    Gestión de cuentas y tarjetas

    Operaciones de compra, venta y movimientos
__

    Middlewares (src/middleware)

    Los middlewares actúan como capas intermedias entre las rutas y los controladores. Se utilizan principalmente para:

    Autenticación y autorización mediante JWT

    Validaciones de datos

    Manejo de errores

    Un ejemplo clave es el middleware de autenticación, que valida el token enviado en los headers y adjunta la información del usuario a la solicitud.
__

    Controladores (src/controller)

    Los controladores reciben las solicitudes ya validadas y se encargan de:

    Procesar los datos de entrada (params, body, query)

    Invocar los servicios correspondientes

    Retornar las respuestas HTTP al cliente

    Esta capa no contiene lógica compleja, sino que delega dichas responsabilidades a los servicios.
__

    Servicios (src/services)

    La capa de servicios contiene la lógica de negocio de la aplicación. Aquí se implementan reglas como:

    Validación de permisos del usuario

    Operaciones sobre cuentas y tarjetas

    Soft delete de registros

    Control de estados y relaciones entre entidades

    Los servicios interactúan directamente con los modelos para acceder a la base de datos.
__

    Modelos (src/models)

    Los modelos representan las entidades del sistema y su persistencia en la base de datos. Utilizando Sequelize, se definen las tablas, sus campos y las relaciones entre ellas (usuarios, cuentas, productos, movimientos, etc.).
__

    Migraciones y Seeders

    migrations: permiten versionar la estructura de la base de datos y mantener consistencia entre entornos.

    seeders: se utilizan para cargar datos iniciales o de prueba en la base de datos.

## FLUJO DE LÓGICA DEL FRONTEND
El frontend del proyecto está desarrollado con React utilizando Vite como herramienta de construcción. Al igual que el backend, la aplicación sigue una estructura modular que separa la lógica, las vistas y los servicios, permitiendo una navegación clara y un mantenimiento sencillo.

El flujo general de la aplicación es el siguiente:

Usuario → Rutas → Layouts → Páginas → Componentes → Servicios → Backend → Response → UI

A continuacion se desscribe el rol de cada componente dentro de la estructura del proyecto.

    Punto de entrada

    El archivo main.jsx es el punto de entrada de la aplicación. Allí se inicializa React, se monta el componente principal App.jsx y se configuran los proveedores globales, como el contexto de autenticación.

    El archivo App.jsx define la estructura general de la aplicación y centraliza el sistema de rutas.
__

    Rutas (src/routes)

    Este directorio contiene la definición de las rutas del frontend utilizando react-router-dom. Aquí se establecen:

    Rutas públicas (login, registro)

    Rutas protegidas (acceso solo para usuarios autenticados)

    Redirecciones y control de acceso

    Las rutas determinan qué página se renderiza según la URL actual.
__

    Layouts (src/layouts)

    Los layouts definen la estructura visual compartida entre múltiples páginas, como:

    main

    products

    algunas carts

    Esto permite reutilizar la misma disposición visual sin duplicar código en cada página.
__

    Páginas (src/pages)

    Las páginas representan las vistas principales del sistema. Cada página corresponde a una funcionalidad específica, por ejemplo:

    Inicio de sesión

    Perfil de usuario

    Listado de cuentas

    Detalle de una cuenta o tarjeta

    Creación y edición de entidades

    Las páginas orquestan componentes, y servicios para mostrar información y responder a las acciones del usuario.
__

    Componentes (src/components)

    Los componentes son piezas reutilizables de la interfaz de usuario, como:

    Tarjetas (cards)

    Formularios

    Botones

    Diálogos de confirmación

    Estos componentes reciben datos mediante props y notifican eventos a las páginas que los utilizan.
__

    Contextos (src/context)

    El contexto se utiliza para manejar estado global, principalmente la autenticación del usuario. Aquí se almacenan datos como:

    Usuario autenticado

    Esto evita el uso excesivo de props y permite acceder a la información global desde cualquier parte de la aplicación.
__

    Servicios (src/services)

    La capa de servicios es responsable de la comunicación con el backend. Aquí se definen las funciones que realizan peticiones HTTP (GET, POST, PUT, DELETE/soft delete) utilizando fetch o axios.

    Cada servicio se encarga de una entidad específica (usuarios, cuentas, tarjetas, productos, etc.).
__

    Estilos (src/styles)

    Aquí se encuentran los archivos CSS que definen la apariencia visual de la aplicación.
__

    Seguridad y comunicación

    El frontend no accede directamente a la base de datos. Todas las operaciones se realizan a través del backend mediante solicitudes HTTP.
    El token JWT se almacena localmente y se envía en los headers para acceder a rutas protegidas.
