# API de la Cafetería del CRUI

Trabajo práctico individual 1 de Prácticas Profesionalizantes I.

**Estudiante:** Julia Gabito  
**Carrera:** Tecnicatura en Desarrollo de Software

## Descripción

API desarrollada con Node.js y Express para gestionar los productos de una cafetería.

Permite realizar las cuatro operaciones de un CRUD:

- Crear productos.
- Consultar todos los productos o uno por su identificador.
- Modificar productos.
- Eliminar productos.

Las pruebas se realizaron con Bruno.

## Requisitos

- Node.js y npm instalados.
- Un cliente HTTP, como Bruno, para probar las operaciones.

## Instalación y ejecución

Abrir una terminal en la carpeta del proyecto, donde se encuentra
el archivo package.json.

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
node index.js
```

El servidor estará disponible en:

http://localhost:3000

Mantener la terminal abierta mientras se utiliza la API.
Para detener el servidor, presionar Ctrl + C.

## Rutas disponibles

| Método | Ruta | Función |
| --- | --- | --- |
| GET | / | Mostrar el mensaje de bienvenida. |
| GET | /api/productos | Consultar todos los productos. |
| GET | /api/productos/:id | Consultar un producto por su identificador. |
| POST | /api/productos | Crear un producto. |
| PUT | /api/productos/:id | Modificar un producto existente. |
| DELETE | /api/productos/:id | Eliminar un producto. |

`:id` se reemplaza por el identificador del producto.
Por ejemplo: `/api/productos/2`.

## Crear y modificar productos

Las solicitudes POST y PUT utilizan un cuerpo JSON.

Ejemplo:

```json
{
  "nombre": "Té",
  "precio": 1500,
  "categoria": "bebida"
}
```

El servidor asigna automáticamente el identificador al crear un producto.

Para modificarlo con PUT, enviar nombre, precio y categoría.
El identificador se conserva.

## Validaciones y respuestas

- El nombre debe ser un texto y no puede estar vacío ni contener
  solamente espacios.
- El precio debe ser un número finito mayor que cero.
- Un precio entre comillas se considera texto y se rechaza.
- Los datos inválidos reciben una respuesta 400.
- Consultar, modificar o eliminar un producto inexistente devuelve 404.
- La creación exitosa devuelve 201.
- Las consultas, modificaciones y eliminaciones exitosas devuelven 200.
- Las validaciones se realizan antes de crear o modificar el producto.

## Almacenamiento temporal

Los productos se guardan en un array en la memoria del servidor.

Las creacions, modificaciones y eliminaciones se conservan mientras el proceso sigue funcionando. Al reiniciar el servidor, se recuperan los cuatro productos iniciales definidos en index.js.

Guardar una solicitud en la herramienta elegida para enviar
peticiones HTTP y permite repetirla, pero no conserva los datos del servidor después de un reinicio.

## Pruebas

Se comprobaron:

- Consultas de productos existentes e inexistentes.
- Creación de un producto y consulta posterior.
- Rechazo de nombres vacíos y precios inválidos.
- Modificación de un producto y consulta del cambio.
- Rechazo de una modificación inválida, conservando los datos anteriores.
- Eliminación de un producto y comprobación de su ausencia.
- Respuesta 404 al intentar eliminar nuevamente el mismo producto.

La colección de solicitudes está en `Pruebas Cafeteria CRUI`.
Las capturas de las pruebas están en `Capturas`.

## Archivos principales

- `index.js`: servidor, productos iniciales y rutas.
- `package.json`: información del proyecto y dependencias.
- `package-lock.json`: versiones de las dependencias.
- `.gitignore`: excluye node_modules del repositorio.
- `README.md`: documentación del proyecto.