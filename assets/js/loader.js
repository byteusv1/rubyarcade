function refreshGame() {
  var gameFrame = document.getElementById("gameFrame");
  var currentSrc = gameFrame.src;
  gameFrame.src = "";
  setTimeout(function () {
    gameFrame.src = currentSrc;
  }, 100);
}

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
  } else {
    console.error('Invalid game URL:', gameUrl);
  }
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

function removeGameLoader() {
  var gameLoaderSection = document.getElementById("gameLoaderSection");
  gameLoaderSection.style.display = "none";
  var isMuted = true;
  gameFrame.src = "media/icons/loading.gif";

  document.body.classList.remove("no-scroll");
}
