const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  direccion: String,
  ciudad: String,
  edad: Number
});

module.exports = mongoose.models.Cliente ||mongoose.model("Cliente", ClienteSchema);