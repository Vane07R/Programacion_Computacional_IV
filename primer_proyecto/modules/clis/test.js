swal(
    "Oh no!",
    "Tu membresia expiró, comunicate con tu guiadora lo más pronto posible",
    "error"
).then(() => {
    // Puedes borrar esta línea, es solo para probar
    console.log('Aquí rediriges a la otra página');
    // Descomenta la siguiente línea para redirigir
    // Delay para que veas el mensaje
    setTimeout(() => {
        swal.close();
    }, 2000);
    // location.href ="../../../../logout";
});