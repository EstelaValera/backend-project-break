# Proyecto Tienda de Ropa

Este es un proyecto de tienda de ropa que permite a los usuarios ver, crear, editar y eliminar productos. La aplicación está construida utilizando Node.js, Express y MongoDB.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **Express**: Framework web para Node.js que facilita la creación de aplicaciones y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar los productos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener instalado Node.js en tu máquina. Puedes descargarlo desde [aquí](https://nodejs.org/).
2. **MongoDB**: Necesitarás una instancia de MongoDB. Puedes usar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o ejecutar MongoDB localmente.

## Configuración del Proyecto

1. **Clona el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

2. **Instala las dependecnias**

    npm install

3. **Configura las variables de entorno**
Crea un archivo .env en la raíz del proyecto y añade la siguiente configuración:

    MONGO_URI=<TU_URI_DE_MONGODB>
    PORT=3000

4. **Para ejecutar el proyecto utiliza el comando**

    npm start

## Endpoints de la API

**Productos**

- GET /products

    Descripción: Obtiene todos los productos.
    Respuesta: Devuelve una lista de productos.

- GET /products/:productId

    Descripción: Obtiene un producto específico por ID.
    Respuesta: Devuelve los detalles del producto.

- POST /products/create

    Descripción: Crea un nuevo producto.
    Body: {
        "name": "Nombre del producto",
        "description": "Descripción del producto",
        "image": "URL de la imagen",
        "category": "Categoría",
        "size": "Talla",
        "price": "Precio"
        }
    
- POST /products/:productId/edit

    Descripción: Actualiza un producto existente.
    Body: Similar a POST /products/create.

- POST /products/:productId/delete

    Descripción: Elimina un producto existente.


## Despliegue en Render

1. Crea una cuenta en [Render](https://render.com) y vincula tu repositorio de GitHub que contiene el proyecto.
2. Configura el nombre del servicio y las variables de entorno en Render, especialmente `MONGO_URI`.
3. Establece los comandos de construcción y ejecución:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Render se encargará del despliegue automáticamente. La aplicación estará disponible en una URL proporcionada por la plataforma.