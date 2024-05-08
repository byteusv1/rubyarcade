function refreshGame() {
  var gameFrame = document.getElementById("gameFrame");
  var currentSrc = gameFrame.src;
  gameFrame.src = "";
  setTimeout(function () {
    gameFrame.src = currentSrc;
  }, 100);
}

// Function to load game page in the iframe
function loadGame(url) {
  var gameFrame = document.getElementById("gameFrame");
  gameFrame.src = url;

  // Show the game loader section
  var gameLoaderSection = document.getElementById("gameLoaderSection");
  gameLoaderSection.style.display = "flex";

  // Scroll to game loader section
  gameLoaderSection.scrollIntoView({ behavior: "smooth" });

  // Add a class to the body to prevent scrolling
  document.body.classList.add("no-scroll");
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
  gameFrame.src = "";

  document.body.classList.remove("no-scroll");
}