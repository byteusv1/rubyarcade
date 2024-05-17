   
function insertGamesIntoPage(games) {
// Sort games alphabetically by name
games.sort((a, b) => a.name.localeCompare(b.name));

// Move favorited games to the beginning of the list
const favoritedGames = games.filter(game => game.favorited); // Assuming you have a 'favorited' property in your game objects
const nonFavoritedGames = games.filter(game => !game.favorited);
games = [...favoritedGames, ...nonFavoritedGames];

var gamesContainer = document.getElementById("gamesList");
if (gamesContainer) {
gamesContainer.innerHTML = ""; // Clear the container first


games.forEach(function(game) {
    var gameHTML = generateGameHTML(game);
    gamesContainer.innerHTML += gameHTML;
});

const buttons = document.querySelectorAll('.btn-hover');
buttons.forEach(button => {
    applyHoverEffect(button);
});
}
}


function generateGameHTML(game) {
return `
<div class="btn btn-hover" onclick="loadGame('${game.playUrl}')" ">
<button class="btn-favorite" onclick="favoriteGame(event)">&#x2764;</button>
    <img src="${game.imageUrl}" />
    <span>${game.name}</span>
</div>

`;
}


function updateLocalStorage() {
// Get all favorited game buttons
const favoritedButtons = document.querySelectorAll('.btn-favorite.favorited');

// Extract the HTML of each favorited game button
const favoritedGamesHTML = new Set(); // Using a Set to ensure uniqueness
favoritedButtons.forEach(button => {
const gameHTML = button.parentElement.outerHTML;
favoritedGamesHTML.add(gameHTML);
});

// Save the list of favorited game HTML in localStorage
localStorage.setItem('favoriteGamesHTML', JSON.stringify(Array.from(favoritedGamesHTML)));
}

document.addEventListener('DOMContentLoaded', function() {
// Retrieve favorited games HTML from localStorage
const favoritedGamesHTML = JSON.parse(localStorage.getItem('favoriteGamesHTML'));

// Get the favorite games container
const favoriteGamesContainer = document.getElementById('favoriteGames');

// If there are favorited games stored in localStorage, display them
if (favoritedGamesHTML) {
favoritedGamesHTML.forEach(gameHTML => {
    const gameElement = document.createElement('div');
    gameElement.innerHTML = gameHTML;
    favoriteGamesContainer.appendChild(gameElement.firstChild);
});
}
});

function favoriteGame(event) {
// Prevent the default behavior of the button (e.g., submitting a form)
event.preventDefault();
event.stopPropagation();

// Toggle a class on the button to visually indicate it's been favorited
event.target.classList.toggle('favorited');

// Find the parent game element
const gameElement = event.target.closest('.btn');

// Get the favorite games container
const favoriteGamesContainer = document.getElementById('favoriteGames');

if (gameElement.parentElement === favoriteGamesContainer) {
// If the game element is already in the favorite games container, remove it
favoriteGamesContainer.removeChild(gameElement);
} else {
// Clone the game element
const clonedGameElement = gameElement.cloneNode(true);
// Remove the 'favorited' class from the cloned element to avoid duplication
clonedGameElement.classList.remove('favorited');



// Insert the cloned game element at the top of the favorite games container
favoriteGamesContainer.prepend(clonedGameElement);
}

// Update localStorage
updateLocalStorage();
}





fetch('assets/data/games.json')
.then(response => response.json())
.then(data => {
// Store the loaded games data in the gamesData variable
gamesData = data;

// Insert all games into the page initially
insertGamesIntoPage(gamesData);
})
.catch(error => {
console.error('Error loading the JSON file:', error);
});

    const dropdown = document.querySelector('.dropdown');

    function filterGamesByGenre(genre) {
// If genre is 'all', display all games
if (genre === 'all') {
insertGamesIntoPage(gamesData);
} else {
// Filter games based on genre
const filteredGames = gamesData.filter(game => game.genres.includes(genre));
insertGamesIntoPage(filteredGames);
}
}

// Event listener to trigger filtering when dropdown value changes
dropdown.addEventListener('change', function() {
const selectedGenre = this.value;
filterGamesByGenre(selectedGenre);
});