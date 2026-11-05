// Estructura de datos para almacenar la información de cada cabaña
const inventarioCabanas = {
    cabana1: {
        titulo: "Cabaña Bosque",
        descripcion: "Esta cabaña cuenta con 2 habitaciones, 1 baño completo, chimenea, cocina equipada, y asador exterior. Ideal para desconectarse.",
        fotos: ["https://via.placeholder.com/300x200?text=Foto+1", "https://via.placeholder.com/300x200?text=Foto+2"],
        mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119641.53075217435!2d-103.11189445474751!3d19.919246193796596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f132e4d9f6581%3A0xf63eb9f874558!2sMazamitla%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
    },
    cabana2: {
        titulo: "Cabaña Montaña",
        descripcion: "Perfecta para parejas. Incluye cama king size, jacuzzi privado, vista panorámica y calefacción.",
        fotos: ["https://via.placeholder.com/300x200?text=Foto+3", "https://via.placeholder.com/300x200?text=Foto+4"],
        mapa: "https://www.google.com/maps/embed?pb=!1m18!..." // Reemplazar con iframe real
    },
    cabana3: {
        titulo: "Cabaña Lago",
        descripcion: "Amplia terraza exterior. 3 habitaciones, 2 baños. Capacidad para 6 personas. Incluye zona de fogata.",
        fotos: ["https://via.placeholder.com/300x200?text=Foto+5", "https://via.placeholder.com/300x200?text=Foto+6"],
        mapa: "https://www.google.com/maps/embed?pb=!1m18!..." 
    },
    cabana4: {
        titulo: "Cabaña Pino",
        descripcion: "Diseño rústico de dos plantas. 4 habitaciones, sala de juegos con mesa de billar, comedor para 8 personas.",
        fotos: ["https://via.placeholder.com/300x200?text=Foto+7", "https://via.placeholder.com/300x200?text=Foto+8"],
        mapa: "https://www.google.com/maps/embed?pb=!1m18!..." 
    },
    cabana5: {
        titulo: "Cabaña Vista",
        descripcion: "Nuestra cabaña más grande. 5 habitaciones, 3 baños completos, cocina industrial, terraza techada y amplio jardín.",
        fotos: ["https://via.placeholder.com/300x200?text=Foto+9", "https://via.placeholder.com/300x200?text=Foto+10"],
        mapa: "https://www.google.com/maps/embed?pb=!1m18!..." 
    }
};

// Función para inyectar datos y mostrar la ventana emergente
function abrirModal(id) {
    const cabanaSeleccionada = inventarioCabanas[id];
    const modal = document.getElementById("modal-detalle");
    
    document.getElementById("modal-titulo").innerText = cabanaSeleccionada.titulo;
    document.getElementById("modal-descripcion").innerText = cabanaSeleccionada.descripcion;
    document.getElementById("modal-mapa").src = cabanaSeleccionada.mapa;
    
    const contenedorGaleria = document.getElementById("modal-galeria-extra");
    contenedorGaleria.innerHTML = ""; 
    
    cabanaSeleccionada.fotos.forEach(rutaFoto => {
        const imagen = document.createElement("img");
        imagen.src = rutaFoto;
        contenedorGaleria.appendChild(imagen);
    });
    
    modal.classList.remove("oculto");
}

// Función para ocultar la ventana emergente
function cerrarModal() {
    const modal = document.getElementById("modal-detalle");
    modal.classList.add("oculto");
    document.getElementById("modal-mapa").src = ""; // Detiene la carga del mapa en segundo plano
}