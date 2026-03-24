const express = require('express');
const Cliente = require('../models/Cliente');
const router = express.Router();

// 1. CREATE: Crear un cliente
router.post('/', async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 2. READ: Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. UPDATE: Actualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. DELETE: Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Cliente eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;
