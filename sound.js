// ========== Audio Files ==========
const clickSound = new Audio('sounds/click.mp3');
const errorSound = new Audio('sounds/background.mp3');
const bgMusic = new Audio('sounds/');

// Preload audio
clickSound.preload = 'auto';
errorSound.preload = 'auto';
bgMusic.preload = 'auto';
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Function to play sound effects
function playSound(sound) {
  sound.currentTime = 0; // Reset to start
  sound.play().catch((error) => {
    console.error('Audio play error:', error);
  });
}

// ========== Wait for User Interaction ==========
document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch((error) => {
      console.error('Background music play error:', error);
    });
  }
}, { once: true }); // Play only once after first interaction

// ========== Score ==========
let score = 0;

// Update the score
function updateScore(points) {
  score += points;
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = score;
}

// ========== Generate Game Tiles ==========
const stage = document.querySelector('.stage');

// Function to generate tiles
function generateTiles(tileCount) {
  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    // Add click event for sound and interaction
    tile.addEventListener('click', () => {
      // Play click sound
      playSound(clickSound);

      // Add pressed class for visual feedback
      tile.classList.add('pressed');

      // Simulate a condition for error sound
      if (i === 3) {
        playSound(errorSound);
        updateScore(-1); // Decrease score for error
      } else {
        updateScore(1); // Increase score for correct tile
      }

      // Remove the pressed state after animation
      setTimeout(() => tile.classList.remove('pressed'), 300);
    });

    // Add the tile to the stage
    stage.appendChild(tile);
  }
}

// Generate 9 tiles for the game
generateTiles(9);

// ========== Mute/Unmute Button ==========
const muteButton = document.createElement('button');
muteButton.innerText = 'Mute';
muteButton.style.cssText = `
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
document.body.appendChild(muteButton);

// Toggle mute for background music
muteButton.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteButton.innerText = bgMusic.muted ? 'Unmute' : 'Mute';
});
