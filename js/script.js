const productos = [
    { nombre: "Vestido midi floral",   cat: "vestidos",   precio: 89,  detalle: "Tela fresca, tallas S a XL",   color: "#f3c4d4", icono: "👗" },
    { nombre: "Vestido negro clásico", cat: "vestidos",   precio: 99,  detalle: "Para oficina y salidas",       color: "#d9cde6", icono: "👗" },
    { nombre: "Blusa de lino",         cat: "blusas",     precio: 59,  detalle: "Manga corta, color salvia",    color: "#d3ddcd", icono: "👚" },
    { nombre: "Blusa con volantes",    cat: "blusas",     precio: 65,  detalle: "Ligera y sin plancha",         color: "#f6dcb9", icono: "👚" },
    { nombre: "Pantalón palazzo",      cat: "pantalones", precio: 79,  detalle: "Tiro alto, tela fluida",       color: "#cfc0e2", icono: "👖" },
    { nombre: "Jean recto azul",       cat: "pantalones", precio: 85,  detalle: "Stretch, cómodo todo el día",  color: "#c5d3e8", icono: "👖" },
    { nombre: "Cartera de mano",       cat: "accesorios", precio: 49,  detalle: "Cierre con broche dorado",     color: "#f1d3a6", icono: "👜" },
    { nombre: "Set de collares",       cat: "accesorios", precio: 35,  detalle: "Tres piezas livianas",         color: "#e9a3ba", icono: "📿" }
];

const contenedor = document.getElementById("productos");
const contador = document.getElementById("contador");
let pedido = 0;

function mostrarProductos(categoria) {
    const lista = categoria === "todos" ? productos : productos.filter(p => p.cat === categoria);
    contenedor.innerHTML = lista.map(p => `
        <div class="col-sm-6 col-lg-3">
            <article class="tarjeta">
                <div class="muestra" style="background:${p.color}" aria-hidden="true">${p.icono}</div>
                <div class="card-body">
                    <h3 class="h6 nombre">${p.nombre}</h3>
                    <p class="detalle">${p.detalle}</p>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <span class="precio">S/ ${p.precio}</span>
                        <button class="btn btn-sm btn-magnolia" data-nombre="${p.nombre}">Agregar</button>
                    </div>
                </div>
            </article>
        </div>`).join("");
}

document.getElementById("filtros").addEventListener("click", e => {
    const boton = e.target.closest("button[data-cat]");
    if (!boton) return;
    document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    mostrarProductos(boton.dataset.cat);
});

contenedor.addEventListener("click", e => {
    const boton = e.target.closest("button[data-nombre]");
    if (!boton) return;
    pedido++;
    contador.textContent = pedido;
    document.getElementById("avisoTexto").textContent = boton.dataset.nombre + " agregado a tu pedido";
    bootstrap.Toast.getOrCreateInstance(document.getElementById("aviso"), { delay: 2500 }).show();
});

document.getElementById("formulario").addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const respuesta = document.getElementById("respuesta");
    if (!nombre || !mensaje) {
        respuesta.className = "alert alert-danger mt-3";
        respuesta.textContent = "Completa tu nombre y la prenda que quieres para enviar el pedido.";
        return;
    }
    respuesta.className = "alert alert-success mt-3";
    respuesta.textContent = "Gracias, " + nombre + ". Te escribiremos por WhatsApp para confirmar tu pedido.";
    e.target.reset();
});

mostrarProductos("todos"); 