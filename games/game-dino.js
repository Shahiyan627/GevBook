document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dinoGameCanvas');
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const pauseMessage = document.getElementById('pauseMessage'); 
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton'); 
    const quitButton = document.getElementById('quitButton');
    
    const jumpSound = document.getElementById('jumpSound');
    const dieSound = document.getElementById('dieSound');
    const pointSound = document.getElementById('pointSound');

    const GAME_WIDTH = canvas.width;
    const GAME_HEIGHT = canvas.height;
    const GROUND_Y = GAME_HEIGHT - 5; 
    const DINO_WIDTH = 40; 
    const DINO_HEIGHT = 45; 
    const CACTUS_WIDTH = 15;
    const CACTUS_HEIGHT = 30;

    let gameOver = true;
    let isPaused = false; 
    let score = 0;
    let speed = 5;
    let animationId;
    let obstacles = [];
    let frameCount = 0; 
    let groundOffset = 0;
    let nextObstacleTimeout;

    const dinoSprite = new Image();
    dinoSprite.src = './img/dino.jpg'; 
    const cactusSprite = new Image();
    cactusSprite.src = './img/cactus.png'; 
    const groundSprite = new Image();
    groundSprite.src = './img/ground.png'; 

    let dinoReady = false;
    let cactusReady = false;
    let groundReady = false;

    const dino = {
        x: 50,
        y: GROUND_Y - DINO_HEIGHT, 
        width: DINO_WIDTH,
        height: DINO_HEIGHT,
        vy: 0,
        gravity: 0.8,
        isJumping: false,

        draw() {
            if (dinoReady) {
                ctx.drawImage(dinoSprite, this.x, this.y, this.width, this.height);
            } else {
                 ctx.fillStyle = gameOver ? '#e4405f' : '#1c1e21';
                 ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        },
        
        jump() {
            if (!this.isJumping) {
                this.isJumping = true;
                this.vy = -14; 
                if (jumpSound) {
                    jumpSound.currentTime = 0;
                    jumpSound.play().catch(e => console.warn("Звук прыжка не сработал:", e));
                }
            }
        },

        update() {
            if (this.isJumping) {
                this.vy += this.gravity;
                this.y += this.vy;

                if (this.y >= GROUND_Y - this.height) {
                    this.y = GROUND_Y - this.height;
                    this.isJumping = false;
                    this.vy = 0;
                }
            }
        }
    };

    class Obstacle {
        constructor(x) {
            this.width = CACTUS_WIDTH + Math.random() * 10; 
            this.height = CACTUS_HEIGHT + Math.random() * 15; 
            this.x = x;
            this.y = GROUND_Y - this.height;
        }

        draw() {
            if (cactusReady) {
                ctx.drawImage(cactusSprite, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = '#00a400'; 
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        update() {
            this.x -= speed;
        }
    }
    
    
    function drawGround() {
        groundOffset -= speed;
        
        if (groundReady && groundSprite.naturalHeight !== 0) {
            const groundW = groundSprite.naturalWidth;
            const groundH = groundSprite.naturalHeight; 
            if (groundOffset < -groundW) { 
                groundOffset += groundW;
            }
            ctx.drawImage(groundSprite, groundOffset, GROUND_Y, groundW, groundH);
            ctx.drawImage(groundSprite, groundOffset + groundW, GROUND_Y, groundW, groundH);
        } else {
            ctx.fillStyle = '#606770'; 
            ctx.fillRect(0, GROUND_Y, GAME_WIDTH, 5);
        }
    }
    
    function checkCollision(dino, obstacle) {
        return dino.x < obstacle.x + obstacle.width &&
               dino.x + dino.width > obstacle.x &&
               dino.y < obstacle.y + obstacle.height &&
               dino.y + dino.height > obstacle.y;
    }

    function generateObstacle() {
        if (gameOver || isPaused) {
            nextObstacleTimeout = setTimeout(generateObstacle, 1000); 
            return;
        }

        const minTime = 800; 
        const maxTime = 1800; 
        
        const effectiveMaxTime = Math.max(minTime, maxTime - speed * 100); 
        const randomTime = minTime + Math.random() * (effectiveMaxTime - minTime);
        
        obstacles.push(new Obstacle(GAME_WIDTH));
        
        nextObstacleTimeout = setTimeout(generateObstacle, randomTime);
    }
    
    function clearObstacleTimeout() {
        clearTimeout(nextObstacleTimeout);
    }

    function gameLoop() {
        if (gameOver || isPaused) return;

        animationId = requestAnimationFrame(gameLoop);
        frameCount++;
        
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        drawGround();

        dino.update();
        dino.draw();

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            obstacle.update();
            obstacle.draw();

            if (checkCollision(dino, obstacle)) {
                endGame();
                return;
            }
        }

        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
        
        if (frameCount % 6 === 0) { 
            score++;
        }
        
        if (score > 0 && score % 100 === 0 && frameCount % 6 === 0) {
            speed += 0.5; 
            if (pointSound) {
                 pointSound.currentTime = 0;
                 pointSound.play().catch(e => {}); 
            }
        }
        scoreDisplay.textContent = `СЧЕТ: ${score.toString().padStart(5, '0')}`;
    }

    
    function startGame() {
        if (!gameOver) return;
        
        gameOver = false;
        isPaused = false;
        score = 0;
        speed = 5;
        frameCount = 0;
        dino.y = GROUND_Y - dino.height;
        dino.vy = 0;
        dino.isJumping = false;
        obstacles = [];
        scoreDisplay.textContent = `СЧЕТ: 00000`;
        gameOverMessage.style.display = 'none';
        pauseMessage.style.display = 'none';
        startButton.textContent = 'Начать игру / Прыжок (Пробел)';
        pauseButton.disabled = false;
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Пауза (P)';
        
        clearObstacleTimeout(); 
        generateObstacle(); 
        gameLoop();
    }
    
    function endGame() {
        gameOver = true;
        cancelAnimationFrame(animationId);
        gameOverMessage.style.display = 'block';
        startButton.textContent = 'Перезапуск (Пробел)';
        pauseButton.disabled = true;

        clearObstacleTimeout(); 
        
        if (dieSound) {
            dieSound.play().catch(e => {}); 
        }

        dino.draw();
        scoreDisplay.textContent = `ФИНАЛЬНЫЙ СЧЕТ: ${score.toString().padStart(5, '0')}`;
    }

    function togglePause() {
        if (gameOver) return;

        isPaused = !isPaused;
        
        if (isPaused) {
            cancelAnimationFrame(animationId);
            pauseMessage.style.display = 'block';
            pauseButton.innerHTML = '<i class="fas fa-play"></i> Продолжить (P)';
            clearObstacleTimeout(); 
        } else {
            pauseMessage.style.display = 'none';
            pauseButton.innerHTML = '<i class="fas fa-pause"></i> Пауза (P)';
            gameLoop(); 
            generateObstacle(); 
        }
    }
    

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
            e.preventDefault(); 
            if (gameOver) {
                startGame();
            } else if (!isPaused) {
                dino.jump();
            }
        }
        if (e.key === 'p' || e.key === 'P' || e.code === 'KeyP') {
            e.preventDefault();
            togglePause();
        }
    });

    startButton.addEventListener('click', () => {
        if (gameOver) {
            startGame();
        } else if (!isPaused) {
            dino.jump();
        }
    });

    pauseButton.addEventListener('click', togglePause);

    quitButton.addEventListener('click', () => {
        cancelAnimationFrame(animationId); 
        clearObstacleTimeout();
        window.location.href = '../games-hub/index.html'; 
    });
    
    function initialize() {
        ctx.fillStyle = '#fff'; 
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        drawGround(); 
        dino.draw();
        pauseButton.disabled = false; 

        gameOverMessage.querySelector('p:first-child').textContent = 'ГОТОВ К ИГРЕ';
        gameOverMessage.querySelector('.message-sub').textContent = 'Нажмите "Начать игру" или Пробел, чтобы начать!';
        gameOverMessage.style.display = 'block';
    }

    let imagesLoaded = 0;
    const totalImages = 3;
    const checkImages = (imageName) => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
             dinoReady = dinoSprite.complete;
             cactusReady = cactusSprite.complete;
             groundReady = groundSprite.complete;
             initialize();
        }
    };
    
    dinoSprite.onload = () => checkImages('Dino');
    dinoSprite.onerror = () => checkImages('Dino (Error)');
    
    cactusSprite.onload = () => checkImages('Cactus');
    cactusSprite.onerror = () => checkImages('Cactus (Error)');
    
    groundSprite.onload = () => checkImages('Ground');
    groundSprite.onerror = () => checkImages('Ground (Error)');

    if (dinoSprite.complete && cactusSprite.complete && groundSprite.complete) {
        imagesLoaded = totalImages;
        dinoReady = true;
        cactusReady = true;
        groundReady = true;
        initialize();
    }
});