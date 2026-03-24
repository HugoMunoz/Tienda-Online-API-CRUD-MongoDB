const express = require('express');
const Pedido = require('../models/Pedido');
const router = express.Router();

// 1. CREATE: Crear un pedido
router.post('/', async (req, res) => {
    try {
        const nuevoPedido = new Pedido(req.body);
        await nuevoPedido.save();
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 2. READ: Obtener todos los pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 3. UPDATE: Actualizar por ID
// Nota: Quitamos '/pedidos' de la ruta porque ya se define en server.js
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. DELETE: Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        await Pedido.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Pedido eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error de servidor", error: error.message });
    }
});

module.exports = router;
