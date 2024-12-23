const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameRunning = true;

// Game configuration
const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 30,
    color: 'red',
    speed: 5
};
const obstacles = [];
let level = 1;
const levels = [
    { speed: 3, obstacleFrequency: 0.02 },
    { speed: 5, obstacleFrequency: 0.03 },
    { speed: 7, obstacleFrequency: 0.04 }
];

function nextLevel() {
    if (level < levels.length) {
        level++;
        alert(`Level ${level} Start!`);
    } else {
        alert('You completed all levels!');
        gameRunning = false;
    }
}

// Game Loop
function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player car
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Move and draw obstacles
    obstacles.forEach(obstacle => {
        obstacle.x -= levels[level - 1].speed;
        ctx.fillStyle = 'black';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Remove off-screen obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
        }
    }

    // Add new obstacles
    if (Math.random() < levels[level - 1].obstacleFrequency) {
        obstacles.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 30),
            width: 40,
            height: 30
        });
    }

    // Level progression
    if (obstacles.length > 20) {
        nextLevel();
    }

    requestAnimationFrame(gameLoop);
}

// Redirect every 15 seconds
setInterval(() => {
    window.open('https://example.com', '_blank');
}, 15000);

// Player Controls
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.y -= player.speed;
    if (e.key === 'ArrowDown') player.y += player.speed;
});

// Apply customizations
function applyCustomizations() {
    const gameName = document.getElementById('gameName').value;
    const bgColor = document.getElementById('bgColor').value;

    document.title = gameName || 'Customizable Car Racing Game';
    canvas.style.backgroundColor = bgColor;
}

// Start the game
gameLoop();
