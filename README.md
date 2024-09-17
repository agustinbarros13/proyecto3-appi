# Proyecto Express-Mongo-Cloudinary

Este proyecto es una API RESTful construida con Express, MongoDB (a través de Mongoose) y subida de archivos a Cloudinary.

## Endpoints

### **Users**

- **POST** `/api/users`
  - Crea un usuario. Puede incluir una imagen.
  - Request body:
    ```json
    {
      "name": "Nombre del usuario",
      "img": "URL de la imagen (opcional)"
    }
    ```

- **GET** `/api/users`
  - Retorna todos los usuarios.

- **GET** `/api/users/:id`
  - Retorna un usuario específico por ID.

- **PUT** `/api/users/:id`
  - Actualiza un usuario específico por ID.

- **DELETE** `/api/users/:id`
  - Elimina un usuario por ID (también elimina la imagen en Cloudinary si existe).

### **Posts**

- **POST** `/api/posts`
  - Crea un post. Puede incluir una imagen.
  - Request body:
    ```json
    {
      "title": "Título del post",
      "content": "Contenido del post",
      "img": "URL de la imagen (opcional)",
      "author": "ID del usuario autor"
    }
    ```

- **GET** `/api/posts`
  - Retorna todos los posts.

- **GET** `/api/posts/:id`
  - Retorna un post específico por ID.

- **PUT** `/api/posts/:id`
  - Actualiza un post específico por ID.

- **DELETE** `/api/posts/:id`
  - Elimina un post por ID (también elimina la imagen en Cloudinary si existe).

## Semilla de Datos

Puedes inicializar datos de usuario ejecutando el script de semilla:

```bash
node seed.js
