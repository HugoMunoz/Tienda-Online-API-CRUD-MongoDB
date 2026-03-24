const express = require('express');
const Producto = require('../models/producto');
const router = express.Router();

// --- OPERACIONES CRUD ---

// 1. CREATE: Crear un producto
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 2. READ: Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. UPDATE: Actualizar por ID
// Nota: Quitamos '/productos' de la ruta porque ya se define en server.js
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. DELETE: Eliminar producto por ID
router.delete('/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
