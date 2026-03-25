const API_URL = 'http://localhost:3000/productos';

document.getElementById('crud-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;

  const producto = { nombre, precio };

  if (editingId) {
    // Actualizar producto existente
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    editingId = null;
    document.getElementById('btn-submit').textContent = 'Guardar en Atlas';
    document.getElementById('btn-cancel').classList.add('d-none');
  } else {
    // Crear producto nuevo
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
        <td>${prod.categoria}</td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm" onclick="editProduct('${prod._id}', '${prod.nombre}', ${prod.precio})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function editProduct(id, nombre, precio) {
  editingId = id;
  document.getElementById('nombre').value = nombre;
  document.getElementById('precio').value = precio;

  document.getElementById('btn-submit').textContent = 'Actualizar Producto';
  document.getElementById('btn-cancel').classList.remove('d-none');
}

async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchData();
}

function resetForm() {
  document.getElementById('crud-form').reset();
  editingId = null;
  document.getElementById('btn-submit').textContent = 'Guardar en Atlas';
  document.getElementById('btn-cancel').classList.add('d-none');
}