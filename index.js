const express = require("express");
const app = express();

app.use(express.json());
const productos = [
  { id: 1, nombre: "Café con leche", precio: 1800, categoria: "bebida" },
  { id: 2, nombre: "Medialuna", precio: 900, categoria: "comida" },
  { id: 3, nombre: "Tostado de jamón y queso", precio: 3500, categoria: "comida" },
  { id: 4, nombre: "Agua mineral", precio: 1200, categoria: "bebida" }
];

let siguienteId = 5;

app.get("/", (req, res) => {
  res.send("API de la Cafetería del CRUI funcionando");
});

app.get("/api/productos", (req, res) => {
  res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);

  const producto = productos.find(producto => producto.id === id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  res.json(producto);
});

app.post("/api/productos", (req, res) => {
  const { nombre, precio, categoria } = req.body || {};

  // El nombre debe ser un texto con contenido.
  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({
      error: "El nombre es obligatorio y no puede estar vacío"
    });
  }

  // El precio debe ser un número positivo y finito.
  if (
    typeof precio !== "number" ||
    !Number.isFinite(precio) ||
    precio <= 0
  ) {
    return res.status(400).json({
      error: "El precio debe ser un número mayor que cero"
    });
  }

  const nuevoProducto = {
    id: siguienteId,
    nombre: nombre.trim(),
    precio: precio,
    categoria: categoria
  };

  productos.push(nuevoProducto);
  siguienteId++;

  return res.status(201).json(nuevoProducto);
});

// Modificar un producto existente.
app.put("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);

  const producto = productos.find(producto => producto.id === id);

  if (!producto) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const { nombre, precio, categoria } = req.body || {};

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({
      error: "El nombre es obligatorio y no puede estar vacío"
    });
  }

  if (
    typeof precio !== "number" ||
    !Number.isFinite(precio) ||
    precio <= 0
  ) {
    return res.status(400).json({
      error: "El precio debe ser un número mayor que cero"
    });
  }

  producto.nombre = nombre.trim();
  producto.precio = precio;
  producto.categoria = categoria;

  return res.status(200).json(producto);
});

// Eliminar un producto.
app.delete("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = productos.findIndex(producto => producto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: "Producto no encontrado"
    });
  }

  const productoEliminado = productos.splice(indice, 1)[0];

  return res.status(200).json({
    mensaje: "Producto eliminado correctamente",
    producto: productoEliminado
  });
});

app.listen(3000, () => {
  console.log("Servidor disponible en http://localhost:3000");
});