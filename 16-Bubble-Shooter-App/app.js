// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startGame");

let bubbles = [];
let playerBubble;
let isGameStarted = false;
let gameLoopInterval;

// Bubble class to represent each bubble in the game
class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    // Check if two bubbles are close enough to collide
    isColliding(other) {
        const distance = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
        return distance < this.radius + other.radius;
    }
}

// Initialize the player bubble
function createPlayerBubble() {
    const color = getRandomColor();
    playerBubble = new Bubble(canvas.width / 2, canvas.height - 30, color);
}

// Generate a random color for the bubbles
function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Draw the bubbles and the player bubble
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw all bubbles
    bubbles.forEach(bubble => bubble.draw());
    // Draw the player bubble
    if (playerBubble) playerBubble.draw();
}

// Move the player bubble in the direction of the mouse
function movePlayerBubble(event) {
    if (isGameStarted) {
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;

        const angle = Math.atan2(mouseY - playerBubble.y, mouseX - playerBubble.x);
        playerBubble.x += Math.cos(angle) * 5;
        playerBubble.y += Math.sin(angle) * 5;
        draw();
    }
}

// Shoot the player bubble when clicked
function shootPlayerBubble() {
    if (isGameStarted) {
        const newBubble = new Bubble(playerBubble.x, playerBubble.y, playerBubble.color);
        bubbles.push(newBubble);
        playerBubble = null; // Hide player bubble after shooting
        setTimeout(() => createPlayerBubble(), 1000); // Create a new player bubble
    }
}

// Handle bubble collision logic
function handleCollisions() {
    for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
            if (bubbles[i].isColliding(bubbles[j])) {
                // Handle bubble collision (just remove them for simplicity)
                bubbles.splice(i, 1);
                bubbles.splice(j - 1, 1); // j - 1 because the first bubble was removed
                return; // Exit after removing bubbles
            }
        }
    }
}

// Game loop
function gameLoop() {
    if (isGameStarted) {
        draw();
        handleCollisions();
    }
}

// Start or restart the game
startButton.addEventListener('click', () => {
    isGameStarted = true;
    bubbles = [];
    createPlayerBubble();
    gameLoopInterval = setInterval(gameLoop, 1000 / 60); // Run the game loop at 60 FPS
});

// Stop the game
function stopGame() {
    clearInterval(gameLoopInterval);
    isGameStarted = false;
    alert('Game Over');
}

// Event listener for shooting bubbles
canvas.addEventListener('click', shootPlayerBubble);

// Event listener to move player bubble
canvas.addEventListener('mousemove', movePlayerBubble);
