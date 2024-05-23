const XP_PER_SECOND = 2;
const MAX_LEVEL = 99;

let xpInterval;

function startGame() {
  xpInterval = setInterval(() => {
    awardXP(XP_PER_SECOND);
  }, 1000); // Award XP every second
}

function stopGame() {
  clearInterval(xpInterval);
}

function awardXP(xp) {
  let currentXP = parseInt(localStorage.getItem('xp')) || 0;
  let currentLevel = parseInt(localStorage.getItem('level')) || 1;

  currentXP += xp;
  let leveledUp = false;

  while (currentXP >= xpForNextLevel(currentLevel) && currentLevel < MAX_LEVEL) {
    currentXP -= xpForNextLevel(currentLevel);
    currentLevel++;
    leveledUp = true;
  }

  if (currentLevel >= MAX_LEVEL) {
    currentXP = xpForNextLevel(MAX_LEVEL); // Cap XP at max level requirement
  }

  localStorage.setItem('xp', currentXP);
  localStorage.setItem('level', currentLevel);
  displayXPAndLevel();

  if (leveledUp) {
    displayLevelUpNotification(currentLevel);
  }
}

function xpForNextLevel(level) {
  return level * 100; // Example XP required: 100 * current level
}

function displayXPAndLevel() {
  const currentXP = parseInt(localStorage.getItem('xp')) || 0;
  const currentLevel = parseInt(localStorage.getItem('level')) || 1;
  const maxXP = xpForNextLevel(currentLevel);
  document.getElementById('xpDisplay').innerText = `XP: ${currentXP}/${maxXP}`;
  document.getElementById('levelDisplay').innerText = `Level: ${currentLevel}`;
}

function displayLevelUpNotification(level) {
  const notification = document.getElementById('levelUpNotification');
  notification.innerText = `Congratulations! You've reached Level ${level}!`;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000); // Display for 3 seconds
}

document.addEventListener('DOMContentLoaded', displayXPAndLevel);

// Functions to start and stop the game time tracking
function loadGame(gameUrl, gameName) {
  console.log("Loading game from URL:", gameUrl);
  console.log("Game name:", gameName);

  if (gameUrl) {
    var gameFrame = document.getElementById("gameFrame");
    gameFrame.src = gameUrl;

    var gameLoaderSection = document.getElementById("gameLoaderSection");
    gameLoaderSection.style.display = "flex";
    gameLoaderSection.scrollIntoView({ behavior: "smooth" });

    document.body.classList.add("no-scroll");

    var gameNameSpan = document.getElementById("gameNamePlaceholder");
    if (gameNameSpan) {
      gameNameSpan.textContent = gameName;
      console.log("Span content set to:", gameName);
    } else {
      console.error('Span element with ID "gameNamePlaceholder" not found.');
    }

    startGame(); // Start tracking game time
  } else {
    console.error('Invalid game URL:', gameUrl);
  }
}

function removeGameLoader() {
  var gameLoaderSection = document.getElementById("gameLoaderSection");
  gameLoaderSection.style.display = "none";
  var gameFrame = document.getElementById("gameFrame");
  gameFrame.src = "media/icons/loading.gif";

  document.body.classList.remove("no-scroll");

  stopGame(); // Stop tracking game time
}




function refreshGame() {
  var gameFrame = document.getElementById("gameFrame");
  var currentSrc = gameFrame.src;
  gameFrame.src = "";
  setTimeout(function () {
    gameFrame.src = currentSrc;
  }, 100);
}


function expandPage() {
  var gameFrame = document.getElementById("gameFrame");
  var undoExpandBtn = document.getElementById("undoExpandBtn");
  var gameLoaderSection = document.getElementById("gameLoaderSection");

  gameLoaderSection.style.display = "block";
  gameFrame.style.position = "fixed";
  gameFrame.style.top = "0";
  gameFrame.style.left = "0";
  gameFrame.style.width = "100%";
  gameFrame.style.height = "100%";

  undoExpandBtn.style.display = "block";
  ExpandBtn.style.display = "none";
}

function undoExpand() {
  var gameFrame = document.getElementById("gameFrame");
  var undoExpandBtn = document.getElementById("undoExpandBtn");
  var gameLoaderSection = document.getElementById("gameLoaderSection");
  var gameLoaderContainer = document.getElementById("gameLoaderContainer");

  gameLoaderSection.style = "";
  gameLoaderContainer.style = "";
  gameFrame.style = "";
  undoExpandBtn.style.display = "none";
}



