![](https://dkrn4sk0rn31v.cloudfront.net/uploads/2020/12/o-que-e-o-express-js.png)

## Ecommerce Api
## Descripción del proyecto
<p>
Este proyecto es una api de un ecommerce, que permitira a los usuarios, registrarse, iniciar sesión crear productos, comprar productos, ver productos, se podra subir imagenes, actualizar carritos de compras y agregar calificacion a un producto comprado. La aplicación esta construida utilizando node.js, express y utiliza como base de datos PostgreSQL para almacenar la información. documentación: <a target="_blank" href="https://documenter.getpostman.com/view/30851026/2sAXjDdv1W" title="postman lifestyles">postman</a>
</p>

## Caracteristicas principales
- Crear productos;
- Actualizar productos
- Subir imagenes;
- Registrar usuarios;
- Logearse con un usuario;
- Comprar productos;
- Calificar compras;

## Tecnologías utilizadas
- express: Un framework minimalista de Node.js que facilita la creación de aplicaciones web y APIs;
- express-rate-limit: Middleware de Express que limita la cantidad de solicitudes que un cliente puede hacer en un período de tiempo especificado;
- firebase: Una plataforma de desarrollo de aplicaciones móviles y web que proporciona herramientas para crear, mejorar y hacer crecer aplicaciones;
- postgreSQL: Un sistema de gestión de bases de datos relacionales de código abierto;
- Sequelize: Un ORM (Object-Relational Mapping) para bases de datos SQL que simplifica la interacción con la base de datos y proporciona una capa de abstracción sobre SQL;
- jsonwebtokens: JWT (JSON Web Token) es un estándar qué está dentro del documento RFC 7519;
## Requisitos previos para utilizar el proyecto
- Tener node instalado en el equipo;
- Tener postgreSQL instalado;
- Tener creada una base de datos en postgreSQL;
- Tener una instancia de firebase creada con almacenamiento en firestore;
## Como ejecutar el proyecto
- Clonar el repositorio;
- Ejecutar npm install:

```
npm install
```
- Crearse la base de datos local con postgreSQL;
- Crearse una app de firebase e inicializar firestore en ella;
- clonar el .env.template y renombrarlo a .env;
- llenar las variables de entorno;
- levantar el modo de desarrollo utilizando el comando:

```
npm run start:dev
```

