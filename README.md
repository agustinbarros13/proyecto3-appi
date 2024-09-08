# Proyecto Express-Mongo-Cloudinary

Este proyecto es una API RESTful construida con Express, MongoDB (a través de Mongoose) y subida de archivos a Cloudinary.

## Endpoints

### Usuarios

- **POST /users**: Crear un nuevo usuario.
  - Cuerpo: `{ "name": "Nombre", "img": "URL de la imagen opcional" }`
  
- **DELETE /users/:id**: Eliminar un usuario y su imagen de Cloudinary.

### Posts

- **POST /posts**: Crear un nuevo post.
  - Cuerpo: `{ "title": "Título", "content": "Contenido", "img": "URL de la imagen opcional", "author": "ID del usuario" }`

- **GET /posts**: Obtener todos los posts.

