//variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //cuando agregas un curso presionando "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
}

//elimina cursos del carrito
carrito.addEventListener("click", eliminarCurso);

//muestra los cursos de local storage
document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  CarritoHTML();
});

//vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
  articulosCarrito = []; //resetea arreglo

  limpiarHTML(); //elimina todo el HTML
});
//funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina el curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //elimina del arreglo del carrito por el id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    //falta eliminar solamente una cantidad**********

    CarritoHTML(); // itera sobre carrito y muestra HTML
  }
}

// lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
  //crea un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento esta en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el obj actualizado
      } else {
        return curso; //retorna los no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agrega el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //agregar elementos al arreglo de carrito

  CarritoHTML();
}

//muestra el carrito en HTML
function CarritoHTML() {
  //limpiar el HTML
  limpiarHTML();

  //recoore el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    //destructuring
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src ="${imagen}" width="100">
    </td>
    <td>
        ${titulo}
    </td>
    <td>
        ${precio}
    </td>
    <td>
        ${cantidad}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${id}">X </a>
    </td>

    `;
    //agrega el HTML en el tbody en el carrito
    contenedorCarrito.appendChild(row);
  });

  //agregar el carrito al storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//elimina los cursos del tbody
function limpiarHTML() {
  //forma tradicional lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
