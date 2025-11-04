const soportado = ('contacts' in navigator);

console.log(soportado);

const button = document.getElementById('btnContactos');
const divContactos = document.getElementById('contactoSeleccionado');
var contacto;

const selectContacto = async () => {
    contacto = await navigator.contacts.select(['name', 'tel'], { multiple: false });
    divContactos.innerHTML = '${contacto[0].name[0]} - ${contacto[0].tel[0]}';
}



if (soportado) {
    button.addEventListener('click', selectContacto);
} else {
    button.setAttribute('disabled', true);
    alert("Su navegador o sistema operativo no soporta la API de Contactos");
}