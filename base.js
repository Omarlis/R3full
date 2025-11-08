document.getElementById('LoginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const documento = document.getElementById('documento').value.trim();
  const contrasena = document.getElementById('contraseña').value.trim();
  const errorMg = document.getElementById('errorMg');

  if (documento === '' || contrasena === '') {
    errorMg.textContent = 'Por favor, ingrese su documento y contraseña.';
    return;
  }

  if (documento === '0720' && contrasena === '132017') {
    sessionStorage.setItem('rol', 'admin');
    window.location.href = 'admins.html';
  } else {
    // cualquier otro documento y contraseña válida lleva a inicio.html
    sessionStorage.setItem('rol', 'usuario');
    window.location.href = 'inicio.html';
  }
});
