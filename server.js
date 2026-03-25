require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const Producto = require('./models/Producto');

const app = express();
app.use(express.json());
app.use(cors());

const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare y Google DNS

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
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
app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ mensaje: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));