const urlProveedores = "https://api-twbs.onrender.com/api/proveedor";
let id = "";

const listarProveedores = async () => {
  let respuesta = "";
  let contenido = document.getElementById("tablaProveedores");
  fetch(urlProveedores, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listarProveedores = data.proveedores;
      datos = listarProveedores.map(function (proveedor) {
        respuesta +=
          `<tr><td>${proveedor.nombreProveedor}</td>` +
          `<td>${proveedor.nombreContacto}</td>` +
          `<td>${proveedor.correo}</td>` +
          `<td>${proveedor.celular}</td>` +
          `<td><a class="btnsConfi" id="btnMod" value="${proveedor.nombreProveedor}" onclick="abrirFormAct('${proveedor.nombreProveedor}')"><i class="fa fa-user-pen"></i></a></td>` +
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
  document.getElementById("nomProv").value = "";
  document.getElementById("nomCont").value = "";
  document.getElementById("Correo").value = "";
  document.getElementById("numCel").value = "";
};
document.getElementById("btnAgg").addEventListener("click", abrirFormReg);
document.getElementById("canProv").addEventListener("click", abrirFormReg);

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

const aggProv = () => {
  const nomProv = document.getElementById("nomProv").value;
  const nomCont = document.getElementById("nomCont").value;
  const Email = document.getElementById("Correo").value.charAt(0).toUpperCase() + document.getElementById("Correo").value.slice(1).toLowerCase();
  const Cel = document.getElementById("numCel").value;
  const valNomProv = /^[A-Za-z0-9_.-\s]{5,20}$/;
  const valNomCont = /^[A-Za-z0-9_.-\s]{5,20}$/;
  const valEmail = /^[\w\-._]+@[A-Za-z\d.-]{2,}\.[A-Za-z]{2,6}$/;

  if (nomProv == "" && nomCont == "" && Email == "" && Cel == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Complete el formulario!",
    });
  } else if (nomProv == "" || nomProv != nomProv.match(valNomProv)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Nombre de proveedor inválido, revise los carácteres válidos: mayúsculas, minúsculas, números, '-', '_' y '.'",
    });
  } else if (nomProv.length > 20 || nomProv.length < 5) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el nombre de proveedor es de 20 y el mínimo es de 5!",
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
  } else if (nomCont == "" || nomCont != nomCont.match(valNomCont)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Datos de nombre de contacto inválidos, los carácteres válidos son mayúsculas y minúsculas",
    });
  } else if (nomCont.length > 25 || nomCont.length < 4) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el nombre de contacto es de 25 y el mínimo es de 4!",
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
  } else {
    const Proveedores = {
      nombreProveedor: nomProv,
      nombreContacto: nomCont,
      correo: Email,
      celular: Cel,
    };
    fetch(urlProveedores, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(Proveedores),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Proveedor creado.") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          abrirFormReg();
          listarProveedores();
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
document.getElementById("aggProv").addEventListener("click", aggProv);

const abrirFormAct = (Usu) => {
  let formAct = document.getElementById("formulario2");
  let fondo = document.getElementById("fondo2");
  document.getElementById("nomProvL2").classList.add("labelActRol");
  document.getElementById("nomContL2").classList.add("labelActRol");
  document.getElementById("numCelL2").classList.add("labelActRol");
  document.getElementById("CorreoL2").classList.add("labelActRol");
  document.getElementById("nomProv2").value = Usu;

  if (formAct.style.display === "block") {
    formAct.style.display = "none";
    fondo.style.display = "none";
  } else {
    formAct.style.display = "block";
    fondo.style.display = "block";
  }

  fetch(urlProveedores, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaPermisos = data.proveedores;
      datos = listaPermisos.map(function (proveedor) {
        for (let i = 0; i < proveedor.nombreProveedor.length; i++) {
          if (Usu == proveedor.nombreProveedor) {
            document.getElementById("nomCont2").value = proveedor.nombreContacto;
            document.getElementById("Correo2").value = proveedor.correo;
            document.getElementById("numCel2").value = proveedor.celular;
            break;
          }
        }
      });
    });
};
document.getElementById("canProv2").addEventListener("click", abrirFormAct);

const modificarUsu = () => {
  const nomCont = document.getElementById("nomCont2").value;
  const Email = document.getElementById("Correo2").value.charAt(0).toUpperCase() + document.getElementById("Correo2").value.slice(1).toLowerCase();
  const Cel = document.getElementById("numCel2").value;
  const valNomCont = /^[A-Za-z0-9_.-\s]{5,20}$/;
  const valEmail = /^[\w\-._]+@[A-Za-z\d.-]{2,}\.[A-Za-z]{2,6}$/;

  if (nomCont == "" && Email == "" && Cel == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Complete el formulario!",
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
  } else if (nomCont == "" || nomCont != nomCont.match(valNomCont)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Datos de nombre de contacto inválidos, los carácteres válidos son mayúsculas y minúsculas",
    });
  } else if (nomCont.length > 25 || nomCont.length < 4) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "El máximo de caracteres para el nombre de contacto es de 25 y el mínimo es de 4!",
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
  } else {
    const proveedor = {
      nombreProveedor: document.getElementById("nomProv2").value,
      nombreContacto: nomCont,
      correo: Email,
      celular: Cel,
    };
    fetch(urlProveedores, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(proveedor),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Proveedor actualizado correctamente.") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          abrirFormAct();
          listarProveedores();
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
