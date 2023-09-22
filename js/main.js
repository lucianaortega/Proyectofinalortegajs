// Inicio de sesion
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Cargar el archivo JSON de usuarios
        fetch("./JSON/users.json")
            .then((response) => response.json())
            .then((data) => {
                const users = data.users;

                // Verificar las credenciales del usuario
                const user = users.find((user) => user.username === username && user.password === password);

                if (user) {
                    // Redirigir al usuario a la página simulador.html
                    window.location.href = "./pages/simulador.html";
                } else {
                    alert("Credenciales incorrectas. Inténtelo de nuevo.");
                }
            })
            .catch((error) => {
                console.error("Error al cargar los usuarios:", error);
            });
    });
});


let score = 0;

function updateScore() {
    document.getElementById("score").textContent = score;
}

function increaseScore() {
    score++;
    updateScore();
}

function showResult() {
    document.getElementById("result").textContent = score;
    document.getElementById("puntaje-container").style.display = "block";
}

// Cargar el puntaje desde storage

async function loadScore() {
    try {
        const storedScore = localStorage.getItem('score');
        if (storedScore !== null) {
            // Si hay un puntaje almacenado, lo cargamos
            score = parseInt(storedScore, 10);
        } else {
            // Si no hay puntaje almacenado, lo cargamos desde el archivo JSON
            const response = await fetch("./JSON/data.json");
            const data = await response.json();
            score = data.score;
        }
        updateScore();
    } catch (error) {
        console.error("Error al cargar el puntaje:", error);
    }
}


// Guardar el puntaje en el archivo JSON local
function saveScore() {
    localStorage.setItem('score', score.toString());
}

window.onload = function () {
    loadScore();

    const realizeButtons = document.querySelectorAll(".realize-button");
    realizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            increaseScore();
            saveScore();
        });
    });

    const verificarPuntajeButton = document.getElementById("verificar-puntaje");
    verificarPuntajeButton.addEventListener("click", () => {
        showResult();
    });
};

// Asignar una función al botón de cierre de sesión
document.getElementById("logout-button").addEventListener("click", function() {
    window.location.href = "../index.html";
});

// Confites
function createConfetti() {
    const confettiContainer = document.querySelector(".confetti-container");
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.backgroundColor = randomColor();
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        confettiContainer.appendChild(confetti);
    }
}

function randomColor() {
    const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}

const realizeButton = document.querySelector(".realize-button");
realizeButton.addEventListener("click", function() {
    createConfetti();
});
