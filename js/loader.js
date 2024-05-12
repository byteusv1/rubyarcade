function refreshGame() {
  var gameFrame = document.getElementById("gameFrame");
  var currentSrc = gameFrame.src;
  gameFrame.src = "";
  setTimeout(function () {
    gameFrame.src = currentSrc;
  }, 100);
}

function loadGame(gameUrl) {
  console.log("Loading game from URL:", gameUrl);

  // Check if gameUrl is not empty
  if (gameUrl) {
      var gameFrame = document.getElementById("gameFrame");
      gameFrame.src = gameUrl;

      // Show the game loader section
      var gameLoaderSection = document.getElementById("gameLoaderSection");
      gameLoaderSection.style.display = "flex";

      // Scroll to game loader section
      gameLoaderSection.scrollIntoView({ behavior: "smooth" });

      // Add a class to the body to prevent scrolling
      document.body.classList.add("no-scroll");
  } else {
      console.error('Invalid game URL:', gameUrl);
  }
}

// Function to toggle fullscreen mode
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

function removeGameLoader() {
  var gameLoaderSection = document.getElementById("gameLoaderSection");
  gameLoaderSection.style.display = "none";
  var isMuted = true;
  gameFrame.src = "media/icons/loading.gif";

  document.body.classList.remove("no-scroll");
}

