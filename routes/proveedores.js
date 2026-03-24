const express = require('express');
const Proveedor = require('../models/Proveedor');
const router = express.Router();

// --- OPERACIONES CRUD ---

// 1. CREATE: Crear un Proveedor
router.post('/', async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        await nuevoProveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 2. READ: Obtener todos los Proveedores
router.get('/', async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. UPDATE: Actualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. DELETE: Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        await Proveedor.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Proveedor eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
