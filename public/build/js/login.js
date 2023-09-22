const ingresar = () => {
  const em = document.getElementById("email").value;
  const pa = document.getElementById("pass").value;
  const txt = document.getElementById("alerta");
  const valEm = /^[a-zA-Z0-9]+@[a-zA-Z]{4,8}\.[a-zA-Z]{2,4}$/;
  const valPa = /^[a-zA-Z0-9]{8,15}$/;

  if (em == "" && pa == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese datos primero...",
    });
  } else if (em == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un correo!",
    });
  } else if (pa == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese una contraseña!",
    });
  } else if (em != em.match(valEm) && pa != pa.match(valPa)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Correo y contraseña inválidos!",
    });
  } else if (em != em.match(valEm)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Correo inválido!",
    });
  } else if (pa != pa.match(valPa)) {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Contraseña inválida!",
    });
  } 
  
  else if (em.toLowerCase() != "Juan@gmail.com".toLowerCase()) {
    Swal.fire({
      timer: 1600,
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Usuario sin registrar.",
    });
  }
  
  else if (pa != "12345678") {
    Swal.fire({
      timer: 1600,
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Contraseña incorrecta.",
    });
  } else if (em.toLowerCase()  == "Juan@gmail.com".toLowerCase() && pa == "12345678") {
    Swal.fire({
      showConfirmButton: false,
      timer: 1000,
      icon: "success",
      text: "Bienvenido...",
    });
    setTimeout(function () {
      window.location = "ini";
    }, 2500);
  } else {
    Swal.fire({
      icon: "error",
      confirmButtonText: "Aceptar",
      text: "Usuario sin registrar...",
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
  }, 1800);
};
