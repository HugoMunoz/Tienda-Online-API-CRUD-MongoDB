const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare y Google DNS

// Conexión a Mongo Atlas (usa tu URI real)
mongoose.connect("mongodb+srv://huermuquin_db_user:qMd6NrppdUfx4EQN@Cluster0.kv25krn.mongodb.net/tienda_online?retryWrites=true&w=majority")

  .then(() => console.log("✅ Conectado a Mongo Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Importar rutas
const clientesRoutes = require('./Routes/clientes');
const productosRoutes = require('./Routes/productos');
const proveedoresRoutes = require('./Routes/proveedores');
const pedidosRoutes = require('./Routes/pedidos');

// Usar rutas
app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/pedidos", pedidosRoutes);

// Iniciar servidor
app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));