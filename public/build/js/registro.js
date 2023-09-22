const ingresar = () => {
  const nombreUsuario = document.getElementById("nomUsu").value;
  const email = document.getElementById("email").value;
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const celular = document.getElementById("celular").value;
  const password = document.getElementById("pass").value;
  const valNombreUsu = /^[a-zA-Z0-9]{4,15}$/;
  const valEmail = /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;
  const valNombre = /^[a-zA-Z\s]{4,15}$/;
  const valApellidos = /^[a-zA-Z\s]{4,20}$/;
  const valCelular = /^[0-9]{10}$/;
  const valPassword = /^[a-zA-Z0-9]{8,15}$/;

  if (
    nombreUsuario === "" &&
    email == "" &&
    nombre == "" &&
    apellidos == "" &&
    celular == "" &&
    password == ""
  ) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese datos primero...",
    });
  } else if (nombreUsuario == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un nombre de usuario...",
    });
  } else if (email == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese su correo...",
    });
  } else if (nombre == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese su nombre...",
    });
  } else if (apellidos == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese sus apellidos...",
    });
  } else if (celular == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese su número de celular...",
    });
  } else if (password == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese una contraseña...",
    });
  } else if (nombreUsuario != nombreUsuario.match(valNombreUsu)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Nombre de usuario inválido",
      text: 'Porfavor use datos válidos, puede usar de 4 a 15 caracteres que sean de la "a" a la "z", mayúsculas, minúsculas y números',
    });
  } else if (email != email.match(valEmail)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Correo inválido",
      text: "Porfavor use un correo válido, ej: ejemplo@mail.com",
    });
  } else if (nombre != nombre.match(valNombre)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Nombre inválido",
      text: 'Porfavor use datos válidos, puede usar de 4 a 15 caracteres que sean de la "a" a la "z", mayúsculas y minúsculas',
    });
  } else if (apellidos != apellidos.match(valApellidos)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Apellidos inválidos",
      text: 'Porfavor use datos válidos, puede usar de 4 a 20 caracteres que sean de la "a" a la "z", mayúsculas y minúsculas',
    });
  } else if (celular != celular.match(valCelular)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Número de celular inválido",
      text: "Porfavor use un número válido, ej: (318) 517-3515",
    });
  } else if (password != password.match(valPassword)) {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      title: "Contraseña inválida",
      text: 'Porfavor use una contraseña válida, puede usar de 8 a 15 caracteres que sean de la "a" a la "z", mayúsculas, minúsculas y números',
    });
  } else if (
    nombreUsuario &&
    email &&
    nombre &&
    apellidos &&
    celular &&
    password
  ) {
    Swal.fire({
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      text: "Usuario registrado correctamente...",
    });
    setTimeout(function () {
      window.location = "/log";
    }, 500);
    setTimeout(function () {
      window.location = "#";
    }, 2500);
  } else {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      text: "Error!!!",
    });
  }
};
const cancelar = () => {
  const em = document.getElementById("email");
  const pa = document.getElementById("pass");
  em.value = "";
  pa.value = "";
  setTimeout(function () {
    window.location = "/";
  }, 500);
};
const salir = () => {
  Swal.fire({
    showConfirmButton: false,
    timer: 1500,
    icon: "warning",
    text: "Saliendo...",
  });
  setTimeout(function () {
    window.location = "/";
  }, 1500);
};