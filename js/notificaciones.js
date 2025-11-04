"user strict";
const btnNotificar = document.getElementById("btnNotificar");

const showNotificacion = () => {
    const permission = Notification.permission;

    if (permission === "granted") {
        console.info("Notificaciones aceptadas!");
        let notification = new Notification("Esta es una notificación");
        setTimeout(notification.close.bind(notification), 5000);
    } else if (permission === "default") {
        Notification.requestPermission().then(result => {
            if (result === "granted") {
                let notification = new Notification("Esta es una notificación");
                setTimeout(notification.close.bind(notification), 5000);
            } else {
                console.log("No se aceptó recibir notificaciones");
            }
        });
    } else {
        console.log("No se aceptó recibir notificaciones");
    }
}

btnNotificar.addEventListener("click", ()=>{
    showNotificacion();
});