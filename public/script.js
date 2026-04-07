// --- CONFIGURACIÓN DE APIs ---
const API_URL = 'http://localhost:3000/productos';
const API_CLIENTES = 'http://localhost:3000/clientes';
const API_PEDIDOS = 'http://localhost:3000/pedidos';

let editingId = null;
let editingClienteId = null;
let editingPedidoId = null;

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  fetchData(); // Cargar productos al iniciar
});

// ==========================================
// SECCIÓN: PRODUCTOS
// ==========================================

document.getElementById('crud-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById('nombre').value,
    precio: document.getElementById('precio').value,
    stock: document.getElementById('stock').value,
    categoría: document.getElementById('categoria').value
  };

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  }

  fetchData();
  resetForm();
});

async function fetchData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const table = document.getElementById('data-table');
  table.innerHTML = '';

  data.forEach(prod => {
    table.innerHTML += `
      <tr>
        <td>${prod.nombre}</td>
        <td>$${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>${prod.categoría}</td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm" onclick="editProduct('${prod._id}', '${prod.nombre}', '${prod.precio}','${prod.stock}', '${prod.categoría}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editProduct(id, nombre, precio, stock, categoría) {
  editingId = id;
  document.getElementById('nombre').value = nombre;
  document.getElementById('precio').value = precio;
  document.getElementById('stock').value = stock;
  document.getElementById('categoria').value = categoría;

  document.getElementById('form-title').textContent = 'Modificar Producto';
  document.getElementById('btn-submit').textContent = 'Actualizar Producto';
  document.getElementById('btn-submit').className = 'btn btn-warning';
  document.getElementById('btn-cancel').classList.remove('d-none');
}

async function deleteProduct(id) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  }
}

function resetForm() {
  document.getElementById('crud-form').reset();
  editingId = null;
  document.getElementById('form-title').textContent = 'Agregar Producto';
  document.getElementById('btn-submit').textContent = 'Guardar en Atlas';
  document.getElementById('btn-submit').className = 'btn btn-success';
  document.getElementById('btn-cancel').classList.add('d-none');
}

// ==========================================
// SECCIÓN: CLIENTES
// ==========================================

document.getElementById('cliente-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cliente = {
    nombre: document.getElementById('cliente-nombre').value,
    correo: document.getElementById('cliente-correo').value,
    ciudad: document.getElementById('cliente-ciudad').value
  };

  try {
    if (editingClienteId) {
      // MODO ACTUALIZAR
      await fetch(`${API_CLIENTES}/${editingClienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
    } else {
      // MODO CREAR
      await fetch(API_CLIENTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
      console.log("Cliente creado correctamente");
    }

    resetClientForm();
    await fetchClientes();

  } catch (error) {
    console.error("Error detallado:", error);
    // Si entra aquí pero el cambio se hizo, es un error de lógica en el script posterior al fetch
    alert("Cambio procesado (Verifica consola si sale error)");
  }
});

async function fetchClientes() {
  const res = await fetch(API_CLIENTES);
  const data = await res.json();
  const table = document.getElementById('data-table-clientes');
  table.innerHTML = '';

  data.forEach(cli => {
    table.innerHTML += `
            <tr>
                <td>${cli.nombre}</td>
                <td>${cli.correo}</td>
                <td>${cli.ciudad}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm" onclick="editCliente('${cli._id}', '${cli.nombre}', '${cli.correo}', '${cli.ciudad}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCliente('${cli._id}')">Borrar</button>
                </td>
            </tr>`;
  });
}

function editCliente(id, nombre, correo, ciudad) {
  editingClienteId = id;
  document.getElementById('cliente-nombre').value = nombre;
  document.getElementById('cliente-correo').value = correo;
  document.getElementById('cliente-ciudad').value = ciudad;

  document.getElementById('form-title-cli').textContent = 'Modificar Cliente';
  const btnSubmit = document.getElementById('btn-submit-cliente');
  btnSubmit.textContent = 'Actualizar Cliente';
  btnSubmit.className = 'btn btn-warning';

  document.getElementById('btn-cliente-cancel').classList.remove('d-none');
}

async function deleteCliente(id) {
  if (confirm('¿Deseas eliminar este cliente?')) {
    await fetch(`${API_CLIENTES}/${id}`, { method: 'DELETE' });
    fetchClientes();
  }
}

function resetClientForm() {
  document.getElementById('cliente-form').reset();
  editingClienteId = null;
  document.getElementById('form-title-cli').textContent = 'Agregar Cliente';

  const btnSubmit = document.getElementById('btn-submit-cliente');
  if (btnSubmit) {
    btnSubmit.textContent = "Guardar Cliente";
    btnSubmit.className = "btn btn-primary"; // O el color azul que prefieras
  }

  // 4. OCULTAR el botón cancelar (Asegúrate que el ID sea el mismo del HTML)
  const btnCancel = document.getElementById('btn-cliente-cancel');
  if (btnCancel) {
    btnCancel.classList.add('d-none');
  }

  // 5. Restaurar título
  const title = document.getElementById('form-title-cli');
  if (title) title.textContent = "Agregar Cliente";

  // ==========================================
  // SECCIÓN: PEDIDOS
  // ==========================================

  document.getElementById('pedido-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const pedido = {
      nombre_cliente: document.getElementById('pedido-cliente').value,
      total: Number(document.getElementById('pedido-total').value)
    };

    try {
      if (editingPedidoId) {
        await fetch(`${API_PEDIDOS}/${editingPedidoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido)
        });
      } else {
        await fetch(API_PEDIDOS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedido)
        });
      }
      await fetchPedidos();
      resetPedidoForm();
    } catch (error) {
      console.error("Error en pedidos:", error);
    }
  });

  async function fetchPedidos() {
    try {
      const res = await fetch(API_PEDIDOS);
      const data = await res.json();
      const table = document.getElementById('data-table-pedidos');

      if (!table) return; // Seguridad por si el elemento no existe

      table.innerHTML = '';

      data.forEach(ped => {
        table.innerHTML += `
                <tr>
                    <td>${ped.nombre_cliente}</td> 
                    <td>$${ped.total}</td>
                    <td class="text-center">
                        <button class="btn btn-warning btn-sm" onclick="editPedido('${ped._id}', '${ped.nombre_cliente}', ${ped.total})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePedido('${ped._id}')">Borrar</button>
                    </td>
                </tr>`;
      });
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  }

  function editPedido(id, cliente, total) {
    editingPedidoId = id;
    document.getElementById('pedido-cliente').value = cliente;
    document.getElementById('pedido-total').value = total;

    document.getElementById('form-title-ped').textContent = 'Modificar Pedido';
    const btnSubmit = document.getElementById('btn-submit-pedido');
    btnSubmit.textContent = 'Actualizar Pedido';
    btnSubmit.className = 'btn btn-warning';
    document.getElementById('btn-pedido-cancel').classList.remove('d-none');
  }

  async function deletePedido(id) {
    if (confirm('¿Deseas eliminar este pedido?')) {
      await fetch(`${API_PEDIDOS}/${id}`, { method: 'DELETE' });
      fetchPedidos();
    }
  }

  function resetPedidoForm() {
    document.getElementById('pedido-form').reset();
    editingPedidoId = null;
    document.getElementById('form-title-ped').textContent = 'Nuevo Pedido';
    const btnSubmit = document.getElementById('btn-submit-pedido');
    btnSubmit.textContent = "Guardar Pedido";
    btnSubmit.className = "btn btn-success";
    document.getElementById('btn-pedido-cancel').classList.add('d-none');
  }
}

// ==========================================
// NAVEGACIÓN Y UTILIDADES
// ==========================================
function switchTab(tab) {
  // Ocultar todas las secciones
  document.getElementById('section-productos').classList.add('d-none');
  document.getElementById('section-clientes').classList.add('d-none');
  document.getElementById('section-pedidos').classList.add('d-none');

  // Quitar 'active' de todos los botones de navegación
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('active'));

  // Activar la sección y el botón correspondiente
  if (tab === 'productos') {
    document.getElementById('section-productos').classList.remove('d-none');
    links[0].classList.add('active');
    fetchData();
  } else if (tab === 'clientes') {
    document.getElementById('section-clientes').classList.remove('d-none');
    links[1].classList.add('active');
    fetchClientes();
  } else if (tab === 'pedidos') {
    document.getElementById('section-pedidos').classList.remove('d-none');
    links[2].classList.add('active');
    fetchPedidos(); // Asegúrate de que esta función exista en tu script.js
  }
}