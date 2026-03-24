const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  nombre: String,
  contacto: String,
  telefono: String,
  direccion: String,
  productos_suministrados: [String]
});

module.exports = mongoose.models.Proveedor || mongoose.model("Proveedor", ProveedorSchema);


