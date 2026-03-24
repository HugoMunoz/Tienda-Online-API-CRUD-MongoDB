const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente_id: String,
  nombre_cliente: String,
  productos: [
    {
      producto: String,
      cantidad: Number,
      precio_unitario: Number
    }
  ],
  fecha: Date,
  total: Number
});

module.exports = mongoose.models.Pedido ||mongoose.model("Pedido", PedidoSchema);
