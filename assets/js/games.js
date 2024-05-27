function insertGamesIntoPage(games) {
    games.sort((a, b) => a.name.localeCompare(b.name));
    const favoritedGames = games.filter(game => game.favorited);
    const nonFavoritedGames = games.filter(game => !game.favorited);
    games = [...favoritedGames, ...nonFavoritedGames];
    var gamesContainer = document.getElementById("gamesList");
    if (gamesContainer) {
        gamesContainer.innerHTML = "";
        games.forEach(function (game) {
            var gameHTML = generateGameHTML(game);
            gamesContainer.innerHTML += gameHTML;
        });
    }
}

function generateGameHTML(game) {
    return `
        <div class="btn btn-hover" onclick="loadGame('${game.playUrl}', '${game.name}')" ">
            <button class="btn-favorite" onclick="favoriteGame(event)">❥</button>
            <img src="${game.imageUrl}"/>
            <span>${game.name}</span>
        </div>
        `;
}

function updateLocalStorage() {
    const favoritedButtons = document.querySelectorAll('.btn-favorite.favorited');
    const favoritedGamesHTML = new Set();
    favoritedButtons.forEach(button => {
        const gameHTML = button.parentElement.outerHTML;
        favoritedGamesHTML.add(gameHTML);
    });
    localStorage.setItem('favoriteGamesHTML', JSON.stringify(Array.from(favoritedGamesHTML)));
}

document.addEventListener('DOMContentLoaded', function () {
    const favoritedGamesHTML = JSON.parse(localStorage.getItem('favoriteGamesHTML'));
    const favoriteGamesContainer = document.getElementById('favoriteGames');
    if (favoritedGamesHTML) {
        favoritedGamesHTML.forEach(gameHTML => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = gameHTML;
            favoriteGamesContainer.appendChild(gameElement.firstChild);
        });
    }
});

function favoriteGame(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.toggle('favorited');
    const gameElement = event.target.closest('.btn');
    const favoriteGamesContainer = document.getElementById('favoriteGames');
    if (gameElement.parentElement === favoriteGamesContainer) {
        favoriteGamesContainer.removeChild(gameElement);
    } else {
        const clonedGameElement = gameElement.cloneNode(true);
        clonedGameElement.classList.remove('favorited');
        favoriteGamesContainer.prepend(clonedGameElement);
    }
    updateLocalStorage();
}

fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(data => {
        gamesData = data;
        insertGamesIntoPage(gamesData);
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });

const dropdown = document.querySelector('.dropdown');

function filterGamesByGenre(genre) {
    if (genre === 'all') {
        insertGamesIntoPage(gamesData);
    } else {
        const filteredGames = gamesData.filter(game => game.genres.includes(genre));
        insertGamesIntoPage(filteredGames);
    }
}

dropdown.addEventListener('change', function () {
    const selectedGenre = this.value;
    filterGamesByGenre(selectedGenre);
});
