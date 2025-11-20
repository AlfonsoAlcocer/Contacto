const btnCamera = document.getElementById("btnFoto");
const videoElement = document.getElementById("videoElement");
const videoContainer = document.getElementById("video");

const photoCanvas = document.createElement("canvas");
const photoContext = photoCanvas.getContext("2d");

btnCamera.addEventListener("click", async () => {
    try {
        
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];

        console.log("Usando la cámara: " + track.label);

        
        videoElement.srcObject = stream;

        
        btnCamera.setAttribute('hidden', 'true');

        setTimeout(() => {
            photoCanvas.width = videoElement.videoWidth;
            photoCanvas.height = videoElement.videoHeight;

            photoContext.drawImage(videoElement, 0, 0);

            const dataURL = photoCanvas.toDataURL('image/png');
            const img = document.createElement('img');
            img.src = dataURL;
            img.style.width = "100%";

            videoContainer.innerHTML = "";
            videoContainer.appendChild(img);

            stream.getTracks().forEach(track => track.stop());

        }, 3000);

    } catch (error) {
        console.error("Error al acceder a la cámara: ", error);
    }
});
