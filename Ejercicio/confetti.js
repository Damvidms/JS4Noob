// Ancho y alto de la ventana
let W = window.innerWidth;
let H = window.innerHeight;
// Elemento canvas y contexto 2D
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// Número máximo de confettis
let maxConfettis = 150;
// Array para almacenar los objetos confetti
let particles = [];
// Colores posibles para los confettis
let possibleColors = [
    "Gold",
    "Black"
];
// Función para generar un número aleatorio entre `from` y `to` (inclusive)
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
// Constructor de objetos confetti
function confettiParticle() {
    // Coordenada x del confetti
    this.x = Math.random() * W;
    // Coordenada y del confetti
    this.y = Math.random() * H - H;
    // Radio del confetti
    this.r = randomFromTo(11, 33);
    // Densidad del confetti
    this.d = Math.random() * maxConfettis + 11;
    // Color del confetti
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    // Ángulo de inclinación del confetti
    this.tilt = Math.floor(Math.random() * 33) - 11;
    // Incremento del ángulo de inclinación
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    // Ángulo de inclinación actual
    this.tiltAngle = 0;
    // Función para dibujar el confetti
    this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}
// Función para dibujar todos los confettis
function Draw() {
    context.clearRect(0, 0, W, H);
    for (var i = 0; i < maxConfettis; i++) {
        particles[i].draw();
    }
    for (var i = 0; i < maxConfettis; i++) {
        let particle = particles[i];
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
        if (particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }
    requestAnimationFrame(Draw);
}

// Función para limpiar el canvas
function clearCanvas() {
    context.clearRect(0, 0, W, H);
}
// Evento de resize de la ventana
window.addEventListener(
    "resize",
    function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
);
// Inicializa los objetos confetti
for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
}
// Establece el ancho y alto del canvas
canvas.width = W;
canvas.height = H;