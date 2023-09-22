const urlRoles = "https://api-twbs.onrender.com/api/configuracion";
const urlEmpleados = "https://api-twbs.onrender.com/api/empleado";
let id = "";

const Buscador = () => {
  // Obtén una referencia al input de búsqueda y a la tabla
  const inputBusqueda = document.getElementById("buscarI");
  const tabla = document.getElementById("tablaEmpleados");
  const filas = tabla.getElementsByTagName("tr");

  const terminoBusqueda = inputBusqueda.value.toLowerCase();

  // Itera a través de las filas de la tabla
  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.getElementsByTagName("td");
    let coincide = false;

    // Itera a través de las celdas de la fila actual
    for (let j = 0; j < celdas.length; j++) {
      const textoCelda = celdas[j].textContent.toLowerCase();

      // Comprueba si el texto de la celda coincide con el término de búsqueda
      if (textoCelda.includes(terminoBusqueda)) {
        coincide = true;
      }
    }

    // Muestra u oculta la fila según si coincide o no
    if (coincide) {
      fila.style.display = "";
    } else {
      fila.style.display = "none";
    }
  }
};
document.getElementById("buscarI").addEventListener("input", Buscador);

const listarEmpleados = async () => {
  let respuesta = "";
  let contenido = document.getElementById("tablaBodyEmpleados");
  fetch(urlEmpleados, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listarEmpleados = data.empleados;
      datos = listarEmpleados.map(function (empleado) {
        respuesta +=
          `<tr><td>${empleado.nombreUsu}</td>` +
          `<td>${empleado.nombre}</td>` +
          `<td>${empleado.apellidos}</td>` +
          `<td>${empleado.correo}</td>` +
          `<td>${empleado.celular}</td>` +
          `<td>${empleado.porcentajeGanancias}%</td>` +
          `<td><a class="btnsConfi" id="btnMod" value="${empleado.nombreUsu}" onclick="abrirFormAct('${empleado.nombreUsu}')"><i class="fa fa-user-pen"></i></a></td>` +
          `</tr>`;
        contenido.innerHTML = respuesta;
      });
    });
};

const abrirFormReg = () => {
  let formAgg = document.getElementById("formulario");
  let fond = document.getElementById("fondo");
  if (formAgg.style.display === "block") {
    formAgg.style.display = "none";
    fond.style.display = "none";
  } else {
    formAgg.style.display = "block";
    fond.style.display = "block";
  }
  document.getElementById("Usu").value = "";
  document.getElementById("Correo").value = "";
  document.getElementById("Nombre").value = "";
  document.getElementById("Apellidos").value = "";
  document.getElementById("numCel").value = "";
  document.getElementById("Pass").value = "";
  document.getElementById("porceGana").value = "";
};
document.getElementById("btnAgg").addEventListener("click", abrirFormReg);
document.getElementById("CanEmp").addEventListener("click", abrirFormReg);

const validarCelu = (cel) => {
  const celuInp = document.getElementById(cel);
  let valor = celuInp.value;
  valor = valor.replace(/[^\d]/g, "");

  if (valor.length >= 1 && valor.length <= 3) {
    valor = `(${valor}`;
  } else if (valor.length >= 4 && valor.length <= 6) {
    valor = `(${valor.slice(0, 3)}) ${valor.slice(3)}`;
  } else if (valor.length >= 7) {
    valor = `(${valor.slice(0, 3)}) ${valor.slice(3, 6)}-${valor.slice(6, 10)}`;
  }
  celuInp.value = valor;
};

const aggEmp = () => {
  const Usu = document.getElementById("Usu").value;
  const Email = document.getElementById("Correo").value.charAt(0).toUpperCase() + document.getElementById("Correo").value.slice(1).toLowerCase();
  const Name = document.getElementById("Nombre").value.charAt(0).toUpperCase() + document.getElementById("Nombre").value.slice(1).toLowerCase();
  const Last = document.getElementById("Apellidos").value.charAt(0).toUpperCase() + document.getElementById("Apellidos").value.slice(1).toLowerCase();
  const Cel = document.getElementById("numCel").value;
  const Pass = document.getElementById("Pass").value;
  const porGana = document.getElementById("porceGana").value;
  const valUsu = /^[A-Za-z0-9_.-]{5,20}$/;
  const valEmail = /^[\w\-._]+@[A-Za-z\d.-]{2,}\.[A-Za-z]{2,6}$/;
  const valName = /^[A-Za-z\s]{4,25}$/;
  const valLast = /^[A-Za-z\s]{3,25}$/;
  const valPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,25}$/; // Contiene al menos una letra mayúscula, Contiene al menos una letra minúscula, Contiene al menos un dígito, Tiene una longitud mínima de 8 caracteres y maxima de 25.

  if (Usu == "" && Email == "" && Name == "" && Last == "" && Cel == "" && Pass == "" && porGana == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Llene el formulario primero!",
    });
  } else if (Usu == "" || Usu != Usu.match(valUsu)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Usuario inválido, revise los carácteres válidos: mayúsculas, minúsculas, números, '-', '_' y '.'",
    });
  } else if (Usu.length > 20 || Usu.length < 5) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el nombre de usuario es de 20 y el mínimo es de 5!",
    });
  } else if (Email == "" || Email != Email.match(valEmail)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Correo inválido, ejemplo de correo válido: ejemplo@gmail.com",
    });
  } else if (Email.length > 40 || Email.length < 12) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el correo es de 40 y el mínimo es de 12!",
    });
  } else if (Name == "" || Name != Name.match(valName)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Datos de nombre inválidos, los carácteres válidos son mayúsculas y minúsculas",
    });
  } else if (Name.length > 25 || Name.length < 4) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el nombre es de 25 y el mínimo es de 4!",
    });
  } else if (Last == "" || Last != Last.match(valLast)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Datos de apellidos inválidos, los carácteres válidos son mayúsculas y minúsculas",
    });
  } else if (Last.length > 25 || Last.length < 3) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el apellido es de 25 y el mínimo es de 3!",
    });
  } else if (Cel == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Número de celular inválido!",
    });
  } else if (Cel.length < 10) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un número válido!",
    });
  } else if (Pass == "" || Pass != Pass.match(valPass)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Datos de la contraseña inválidos",
      text: "La contraseña debe tener al menos una letra mayúscula, al menos una letra minúscula, al menos un número, mínimo 8 carácteres y máximo 25",
    });
  } else if (Pass.length > 25 || Pass.length < 8) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para la contraseña es de 25 y el mínimo es de 8!",
    });
  } else if (porGana == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un porcentaje de ganancia!",
    });
  } else {
    const Empleados = {
      nombreUsu: Usu,
      correo: Email,
      nombre: Name,
      apellidos: Last,
      celular: Cel,
      password: Pass,
      porcentajeGanancias: porGana,
    };
    fetch(urlEmpleados, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(Empleados),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Empleado creado.") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          listarEmpleados();
          abrirFormReg();
        } else {
          Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: json.msg,
          });
        }
      });
  }
};
document.getElementById("aggEmp").addEventListener("click", aggEmp);

const abrirFormAct = (Usu) => {
  let formAct = document.getElementById("formulario2");
  let fondo = document.getElementById("fondo2");
  if (formAct.style.display === "block") {
    formAct.style.display = "none";
    fondo.style.display = "none";
  } else {
    formAct.style.display = "block";
    fondo.style.display = "block";
  }

  document.getElementById("corL2").classList.add("labelActEmpl");
  document.getElementById("numCelL2").classList.add("labelActEmpl");
  document.getElementById("passL2").classList.add("labelActEmpl");
  document.getElementById("Usu2").value = Usu;

  fetch(urlEmpleados, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaPermisos = data.empleados;

      datos = listaPermisos.map(function (empleado) {
        for (let i = 0; i < empleado.nombreUsu.length; i++) {
          if (Usu == empleado.nombreUsu) {
            id = empleado._id;
            document.getElementById("Correo2").value = empleado.correo;
            document.getElementById("numCel2").value = empleado.celular;
            document.getElementById("Pass2").value = empleado.password;
            break;
          }
        }
      });
    });
};
document.getElementById("CanEmp2").addEventListener("click", abrirFormAct);

const modificarEmpl = () => {
  const Email = document.getElementById("Correo2").value.charAt(0).toUpperCase() + document.getElementById("Correo2").value.slice(1).toLowerCase();
  const Pass = document.getElementById("Pass2").value;
  const Cel = document.getElementById("numCel2").value;
  const valEmail = /^[\w\-._]+@[A-Za-z\d.-]{2,}\.[A-Za-z]{2,6}$/;
  const valPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,25}$/; // Contiene al menos una letra mayúscula, Contiene al menos una letra minúscula, Contiene al menos un dígito, Tiene una longitud mínima de 8 caracteres y maxima de 25.

  if (Email == "" && Pass == "" && Cel == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Llene el formulario primero!",
    });
  } else if (Email == "" || Email != Email.match(valEmail)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Correo inválido, ejemplo de correo válido: ejemplo@gmail.com",
    });
  } else if (Email.length > 40 || Email.length < 12) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el correo es de 40 y el mínimo es de 12!",
    });
  } else if (Cel == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Número de celular inválido!",
    });
  } else if (Cel.length < 10) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un número válido!",
    });
  } else if (Pass == "" || Pass != Pass.match(valPass)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      title: "Datos de la contraseña inválidos",
      text: "debe contener al menos una letra mayúscula, al menos una letra minúscula, al menos un dígito, mínimo 8 caracteres y máximo 25",
    });
  } else if (Pass.length > 25 || Pass.length < 8) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para la contraseña es de 25 y el mínimo es de 8!",
    });
  } else {
    const empleado = {
      nombreUsu: document.getElementById("Usu2").value,
      correo: Email,
      password: Pass,
      celular: Cel,
    };

    fetch(urlEmpleados, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(empleado),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Modificación exitosa") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          listarEmpleados();
        } else {
          Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: json.msg,
          });
        }
      });
  }
};