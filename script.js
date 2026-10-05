// El mensaje que se escribirá. ¡Puedes editar este texto como quieras!
const mensaje = "Hola Fátima hermosa,\n\nQuería darte una pequeña sorpresa. Eres la persona más especial en mi vida y cada momento a tu lado es verdaderamente mágico.\n\nGracias por tu sonrisa, por tu luz y por todo el amor que me das a diario.\n\nTe quiero muchísimo.\n\nCon todo mi amor,\nTu enamorado ❤️";

const scene = document.getElementById('scene');
const title = document.getElementById('title');
const letterContent = document.getElementById('letterContent');
const letter = document.getElementById('letter');
const photoContainer = document.getElementById('photoContainer');
let isOpened = false;

// Evento al tocar el sobre (toda la escena)
scene.addEventListener('click', () => {
    if (!isOpened) {
        isOpened = true;
        
        // Paso 1: Abrir la solapa
        scene.classList.add('is-open');
        
        // Paso 2: Extraer la carta, centrarla y desaparecer el sobre
        setTimeout(() => {
            scene.classList.add('is-extracted');
            title.classList.add('hidden'); // Ocultar el título
            
            // Paso 3: Iniciar la escritura de la carta (después de que se centre)
            setTimeout(() => {
                iniciarEscritura();
            }, 1000); // 1 segundo de espera (duración de transición en CSS)
            
        }, 800); // 0.8s es lo que tarda la solapa en abrirse
    }
});

function iniciarEscritura() {
    let index = 0;
    let textAccumulator = '';
    
    function typeWriter() {
        if (index < mensaje.length) {
            let char = mensaje.charAt(index);
            
            // Reemplazar saltos de línea con <br>
            if (char === '\n') {
                textAccumulator += '<br>';
            } else {
                textAccumulator += char;
            }
            
            // Insertar el texto con el cursor
            letterContent.innerHTML = textAccumulator + '<span class="cursor"></span>';
            index++;
            
            // Hacer scroll hacia abajo automáticamente mientras escribe
            letter.scrollTop = letter.scrollHeight;
            
            // Variar ligeramente la velocidad para simular escritura natural
            const speed = Math.random() * 30 + 40; 
            setTimeout(typeWriter, speed);
        } else {
            // Al terminar la escritura, esperar y luego mostrar la foto
            setTimeout(() => {
                letterContent.innerHTML = textAccumulator; // Quitar el cursor
                mostrarFoto();
            }, 1500); // 1.5 segundos de pausa antes de la foto
        }
    }
    
    typeWriter();
}

function mostrarFoto() {
    // 1. Convertimos la caja de foto de 'none' a 'block' para que ocupe espacio
    photoContainer.style.display = 'block';
    
    // 2. Esperamos al próximo frame para activar la animación de opacidad y desplazamiento
    setTimeout(() => {
        letter.classList.add('show-photo-animate');
        
        // Hacer scroll suave hacia abajo para que se vea la foto
        letter.scrollTo({
            top: letter.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

// Generar partículas mágicas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 20 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        if (Math.random() > 0.4) {
            particle.innerHTML = '✨';
            particle.style.fontSize = `${size}px`;
        } else {
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'rgba(255, 255, 255, 0.15)';
            particle.style.boxShadow = '0 0 10px rgba(255,255,255,0.2)';
        }

        particlesContainer.appendChild(particle);
    }
}

createParticles();
