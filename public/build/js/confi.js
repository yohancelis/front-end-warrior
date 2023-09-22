const urlRoles = "https://api-twbs.onrender.com/api/configuracion";
let id = "";

const listarRoles = async () => {
  let respuesta = "";
  let contenido = document.getElementById("tablaRoles");
  fetch(urlRoles, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaRoles = data.configuraciones;
      datos = listaRoles.map(function (configuracion) {
        respuesta +=
          `<tr><td>${configuracion.rol}</td>` +
          `<td><button type="button" class="btn btnActivo" id="${configuracion.rol}" onclick="cambiarEstado('${configuracion.rol}')">${configuracion.estado}</button></td>` +
          `<td><a class="btnsConfi" id="btnMod" value=${configuracion.rol} onclick="abrirFormAct('${configuracion.rol}')"><i class="fa fa-user-pen"></i></a></td>` +
          `</tr>`;
        contenido.innerHTML = respuesta;
      });
      let botones = document.querySelectorAll("[type='button']");
      botones.forEach((boton) => {
        if (boton.textContent === "Inactivo") {
          boton.classList.remove("btnActivo");
          boton.classList.add("btnInactivo");
        }
      });
    });
};

const cambiarEstado = (idBoton) => {
  const boton = document.getElementById(idBoton);

  if (boton == document.querySelector(`[id="Admin"]`)) {
    Swal.fire({
      icon: "error",
      showConfirmButton: false,
      text: "El rol del Admin no se puede desactivar!",
      timer: 1200,
    });
  } else {
    if (boton.textContent == "Activo") {
      boton.textContent = "Inactivo";
      boton.classList.remove("btnActivo");
      boton.classList.add("btnInactivo");
    } else {
      boton.textContent = "Activo";
      boton.classList.remove("btnInactivo");
      boton.classList.add("btnActivo");
    }

    fetch(urlRoles, {
      method: "GET",
      mode: "cors",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then(function (data) {
        let listaPermisos = data.configuraciones;
        datos = listaPermisos.map(function (configuracion) {
          for (let i = 0; i < configuracion.rol.length; i++) {
            if (idBoton == configuracion.rol) {
              id = configuracion._id;
              asignar();
            }
            break;
          }
        });
      });

    function asignar() {
      let estados = {
        _id: id,
        rol: idBoton,
        estado: boton.textContent,
      };

      fetch(urlRoles, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(estados),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((resp) => resp.json())
        .then((json) => {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: `Cambio de estado exitoso.`,
            timer: 1200,
          });
        });
    }
  }
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

  const permiso = document.getElementsByName("roles");
  permiso.forEach((checkbox) => {
    checkbox.checked = false;
  });
  document.getElementById("nuevoRol").value = "";
};
document.getElementById("btnAgg").addEventListener("click", abrirFormReg);
document.getElementById("canRol").addEventListener("click", abrirFormReg);

const agregarRol = () => {
  const inpRol = document.getElementById("nuevoRol").value.charAt(0).toUpperCase() + document.getElementById("nuevoRol").value.slice(1).toLowerCase();
  const permisosSeleccionados = [];
  const checkboxes = document.querySelectorAll('input[name="roles"]');
  let marcado = false;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      marcado = true;
      break;
    }
  }
  if (inpRol == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un nombre para el rol primero.",
    });
  } else if (!marcado) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Debe seleccionar al menos un permiso.",
    });
  } else {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        permisosSeleccionados.push(checkbox.value);
      }
    });
    const roles = {
      rol: inpRol,
      estado: "Activo",
      permisos: permisosSeleccionados,
    };
    fetch(urlRoles, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(roles),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Inserción exitosa.") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          listarRoles();
          abrirFormReg();
        } else {
          Swal.fire({
            icon: "warning",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
        }
      });
  }
};
document.getElementById("regRol").addEventListener("click", agregarRol);

const abrirFormAct = (Rol) => {
  let formAct = document.getElementById("formulario2");
  let fondo = document.getElementById("fondo2");
  document.getElementById("labelActRol").classList.add("labelActRol");
  document.getElementById("actRol").value = Rol;
  const checkboxes = document.querySelectorAll('input[name="roles2"]');
  const permisosSeleccionados = [];

  if (Rol === "Admin") {
    Swal.fire({
      icon: "error",
      showConfirmButton: false,
      text: "El rol del Admin no se puede modificar!",
      timer: 1200,
    });
    return;
  }

  if (formAct.style.display === "block") {
    formAct.style.display = "none";
    fondo.style.display = "none";
  } else {
    formAct.style.display = "block";
    fondo.style.display = "block";
  }

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  fetch(urlRoles, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaPermisos = data.configuraciones;

      datos = listaPermisos.map(function (configuracion) {
        for (let i = 0; i < configuracion.rol.length; i++) {
          if (Rol == configuracion.rol) {
            id = configuracion._id;
            permisosSeleccionados.push(configuracion.permisos);
            configuracion.permisos.forEach((check) => {
              checkboxes.forEach((checkbox) => {
                if (checkbox.id == check) {
                  checkbox.checked = true;
                }
              });
            });
            break;
          }
        }
      });
    });
};
document.getElementById("canRol2").addEventListener("click", abrirFormAct);

const modificarRol = (Rol) => {
  const actNamRol = document.getElementById("actRol").value;
  Rol = actNamRol.charAt(0).toUpperCase() + actNamRol.slice(1).toLowerCase();
  const checkboxes = document.querySelectorAll('input[name="roles2"]');
  const permisosSeleccionados = [];
  let marcado = false;

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      marcado = true;
      break;
    }
  }
  console.log(marcado);

  let existe = false;
  fetch(urlRoles, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaRoles = data.configuraciones;
      datos = listaRoles.map(function (configuracion) {
        for (let i = 0; i < configuracion.rol.length; i++) {
          if (actNamRol.toLowerCase() == configuracion.rol.toLowerCase()) {
            existe = true;
          }
          break;
        }
      });
    });

  // if (existe) {
  //   Swal.fire({
  //     icon: "error",
  //     confirmButtonText: "Aceptar",
  //     text: "Ya existe un rol con ese nombre.",
  //   });
  // } else
  if (actNamRol.toLowerCase() == "admin") {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      text: "El rol Admin no se puede asignar a otro usuario!",
    });
    abrirFormAct();
    return;
  } else if (actNamRol === "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un nombre para el rol!",
    });
    return;
  } else if (!marcado) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Debe seleccionar al menos un permiso.",
    });
    return;
  } else {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        permisosSeleccionados.push(checkbox.id);
        console.log(permisosSeleccionados);
      }
    });

    let usuario = {
      _id: id,
      rol: Rol,
      permisos: permisosSeleccionados,
    };

    fetch(urlRoles, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(usuario), //Convertir el objeto _usuario  a un JSON
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then((json) => {
        json.msg; //Mensaje que retorna la API
      });

    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      text: "Rol actualizado correctamente...",
      timer: 1200,
    });
  }
  listarRoles();
  abrirFormAct();
};
document.getElementById("actRolBtn").addEventListener("click", modificarRol);
