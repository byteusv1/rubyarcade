const XP_PER_SECOND = 1000000000000000;
const MAX_LEVEL = 999;

let xpInterval;

function startGame() {
  xpInterval = setInterval(() => {
    awardXP(XP_PER_SECOND);
  }, 5000); 
}

function stopGame() {
  clearInterval(xpInterval);
}

document.addEventListener('DOMContentLoaded', function() {
  displayXPAndLevel();
  checkLevelAndShowThemes();
});

function displayNotification(message) {
  const notificationsDiv = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.innerText = message;
  notificationsDiv.appendChild(notification);
  setTimeout(() => {
    notificationsDiv.removeChild(notification);
  }, 10000); 
}

const themes = [
  { name: 'unlocked', unlockLevel: 5},
  { name: 'unlocked2', unlockLevel: 5},
  { name: 'ruby', unlockLevel: 5, notification: 'You have unlocked the Ruby theme!' },
  { name: 'sunwave', unlockLevel: 10, notification: 'You have unlocked the Sunwave theme!' },
  { name: 'blackberry', unlockLevel: 15, notification: 'You have unlocked the Blackberry theme!' },
  { name: 'winter', unlockLevel: 20, notification: 'You have unlocked the Winter theme!' },
  { name: 'summer', unlockLevel: 25, notification: 'You have unlocked the Summer theme!' },
  { name: 'toffee', unlockLevel: 30, notification: 'You have unlocked the Toffee theme!' },
];

function checkLevelAndShowThemes() {
  const currentLevel = parseInt(localStorage.getItem('level')) || 1;

  themes.forEach(theme => {
    const option = document.querySelector(`option[value="${theme.name.toLowerCase()}"]`);
    if (currentLevel >= theme.unlockLevel) {
      option.style.display = 'block';
      if (!localStorage.getItem(`${theme.name.toLowerCase()}Unlocked`)) {
        localStorage.setItem(`${theme.name.toLowerCase()}Unlocked`, true);
        displayNotification(theme.notification);
      }
    } else {
      option.style.display = 'none';
    }
  });
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
    currentXP = xpForNextLevel(MAX_LEVEL);
  }

  localStorage.setItem('xp', currentXP);
  localStorage.setItem('level', currentLevel);
  displayXPAndLevel();

  if (leveledUp) {
    displayLevelUpNotification(currentLevel);
    checkLevelAndShowThemes();
  }
}

function xpForNextLevel(level) {
  return level * 100;
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
  const currentXP = parseInt(localStorage.getItem('xp')) || 0;
  notification.innerText = `Level ${level}! `;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000); 
}

document.addEventListener('DOMContentLoaded', displayXPAndLevel);

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

    startGame(); 
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

  stopGame(); 
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

function toggleFullscreen() {
  var gameFrame = document.getElementById("gameFrame");
  if (!document.fullscreenElement) {
    gameFrame.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
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



