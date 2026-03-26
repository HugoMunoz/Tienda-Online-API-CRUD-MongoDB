const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoría: { type: String, default: 'General' }
});

//const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
