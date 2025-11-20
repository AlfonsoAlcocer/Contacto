const btnCamera = document.getElementById("btnFoto");
const videoElement = document.getElementById("videoElement");
const videoContainer = document.getElementById("video");

const photoCanvas = document.createElement("canvas");
const photoContext = photoCanvas.getContext("2d");

btnCamera.addEventListener("click", async () => {
    try {
        // Solicitar acceso a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];

        console.log("Usando la cámara: " + track.label);

        // Mostrar video en pantalla
        videoElement.srcObject = stream;

        // Ocultar el botón mientras se toma la foto
        btnCamera.setAttribute('hidden', 'true');

        // Esperar 3 segundos y tomar la foto
        setTimeout(() => {
            photoCanvas.width = videoElement.videoWidth;
            photoCanvas.height = videoElement.videoHeight;

            // Dibujar el frame actual del video
            photoContext.drawImage(videoElement, 0, 0);

            // Convertir a imagen PNG
            const dataURL = photoCanvas.toDataURL('image/png');
            const img = document.createElement('img');
            img.src = dataURL;
            img.style.width = "100%";

            // Reemplazar el video por la foto
            videoContainer.innerHTML = "";
            videoContainer.appendChild(img);

            // Detener la cámara
            stream.getTracks().forEach(track => track.stop());

        }, 3000);

    } catch (error) {
        console.error("Error al acceder a la cámara: ", error);
    }
});
