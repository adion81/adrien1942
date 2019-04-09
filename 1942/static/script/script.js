var hero = {
    x: 300,
    y: 500
}

var enemies = [{ x: 50, y: 150, id: 1, explode: false, class: 'enemy3' }, { x: 150, y: 50, id: 2, explode: false, class: 'enemy2'   }, { x: 250, y: 250, id: 3, explode: false, class: 'enemy1'   }, { x: 350, y: 50, id: 4, explode: false, class: 'enemy3'   }, { x: 450, y: 150, id: 5, explode: false, class: 'enemy2'   }, { x: 550, y: 250, id: 6, explode: false , class: 'enemy1' }, { x: 650, y: 50, id: 7, explode: false, class: 'enemy3' }];

var bullets = [];

var lives = [{x: 930, y: 170},{x: 900, y: 170},{x: 870, y: 170},{x: 930, y: 140},{x: 900, y: 140},{x: 870, y: 140},];

var score = 0;

var explosion = new Audio('/1942/static/audio/explosion.m4a');

var bulletFire = new Audio('/1942/static/audio/bullet-sped-up.mp3');
var bulletFire2 = new Audio('/1942/static/audio/bullet1.m4a');
var die = new Audio('/1942/static/audio/die.m4a');

function displayHero() {
    document.getElementById('hero').style['top'] = hero.y + 'px';
    document.getElementById('hero').style['left'] = hero.x + 'px';
}

function displayScore() {
    document.getElementById('score').innerText = score;
}

function displayLives(){
    output = '';
    for(var i = 0; i < lives.length; i++){
        output += "<div class='life' style='top:" + lives[i].y + "px; left:" + lives[i].x + "px;'></div>";
    }
    document.getElementById('lives').innerHTML = output;
}

// !!!!!!Bullet functions!!!!!!
function addBullet() {
    bullets.push({ x: hero.x , y: hero.y });
}

function displayBullets() {
    var output = '';
    for (var i = 0; i < bullets.length; i++) {
        output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
    }
    document.getElementById('bullets').innerHTML = output;
}
function moveBullets() {
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 5;
        if (bullets[i].y <= 0) {
            bullets.shift();
        }
    }
}
// !!!!!!END Bullet functions!!!!!!

// !!!!!!Enemy functions!!!!!!
function displayEnemies() {
    var output = '';
    for (var i = 0; i < enemies.length; i++) {
        output += "<div class='"+ enemies[i].class + "' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;' id='" + enemies[i].id + "'></div>";
    }
    document.getElementById('enemies').innerHTML = output;
}
function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        if(enemies[i].explode == false){
            enemies[i].y += 1;
            if (enemies[i].y > 540) {
                enemies[i].y = 0;
                enemies[i].x = Math.floor(Math.random() * 700);
            }
        }
    }
}
// !!!!!! END Enemy functions!!!!!!

function planeCollision(){
    for(var i = 0; i , enemies.length; i++){
        if(Math.abs(enemies[i].x - hero.x) < 15 && Math.abs(enemies[i].y - hero.y) < 15){
            die.play();
            hero.x = 900;
            if(lives.length == 0){
                gameOver();
            }
            lives.shift();
        }
    }
}

function gameOver(){
        alert("GAME OVER!!!!");
        window.location.reload();
}

function destroyEnemy(idx) {
    score += 50;
    bullets.shift();
    explode();
    console.log('boom'); 
}

function detectCollision() {
    for (var i = 0; i < bullets.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (Math.abs(bullets[i].x - enemies[j].x) < 15 && Math.abs(bullets[i].y - enemies[j].y) < 15) {
                enemies[j].explode = true;
                enemies[j].class = 'explode';
                var temp = enemies[0];
                enemies[0] = enemies[j];
                enemies[j] = temp;
                explosion.play();
                setTimeout(function(){
                    enemies.shift();
                }, 100);
                destroyEnemy();
            }
        }
    }
}

document.onkeydown = function (e) { // left arrow
    if (e.keyCode == 37) {
        if(hero.x > 20){
            hero.x -= 20;
        }
    }
    if (e.keyCode == 38) { // up arrow
        if(hero.y >= 350){
            hero.y -= 20;
        }
    }
    if (e.keyCode == 39) { // right arrow
        if(hero.x <= 800){
            hero.x += 20;
        }
    }
    if (e.keyCode == 40) { // down arrow
        if(hero.y <= 500){
            hero.y += 20;
        }
    }
    if (e.keyCode == 32) { // space bar for bullets
        addBullet();
        if( bullets.length % 2 === 1){
            bulletFire.play();
        }
        else if( bullets.length % 2 === 0){
            bulletFire2.play();
        }
    }
    displayHero();
}

function gameLoop() {
    displayScore();
    displayHero();
    displayLives();
    moveEnemies();
    displayEnemies();
    moveBullets();
    displayBullets();
    detectCollision();
    planeCollision();
}

setInterval(gameLoop, 15);