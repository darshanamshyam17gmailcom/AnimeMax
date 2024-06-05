// Get the anime ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');

// Fetch the anime data from the JSON file
fetch('/data/animeData.json')
   .then(response => response.json())
   .then(animeData => {
        // Find the anime with the matching ID
        const anime = animeData.find(anime => anime.id === parseInt(animeId));

        // Display the anime details
        document.getElementById('anime-title').textContent = anime.title;
        document.getElementById('anime-image').src = anime.image;
        document.getElementById('anime-description').textContent = anime.description;

        // Display the episode list
        const episodeList = document.getElementById('episode-list');
        const episodesButton = document.getElementById('episodes-button');
        const firstEpisodeButton = document.getElementById('first-episode-button');
        const lastEpisodeButton = document.getElementById('last-episode-button');

        // Create episode list items
        anime.episodes.forEach((episode, index) => {
            if (index === 0) {
                firstEpisodeButton.addEventListener('click', () => {
                    window.location.href = `episodePlayer.html?animeId=${animeId}&episodeNumber=${episode.number}`;
                });
            }
            if (index === anime.episodes.length - 1) {
                lastEpisodeButton.addEventListener('click', () => {
                    window.location.href = `episodePlayer.html?animeId=${animeId}&episodeNumber=${episode.number}`;
                });
            }
            const episodeListItem = document.createElement('li');
            episodeListItem.textContent = `Episode ${episode.number}: ${episode.title}`;

            // Create a button for the episode and link it to the episodePlayer.html page
            const episodeButton = document.createElement('button');
            episodeButton.textContent = 'Watch';
            episodeButton.addEventListener('click', () => {
                window.location.href = `episodePlayer.html?animeId=${animeId}&episodeNumber=${episode.number}`;
            });

            episodeListItem.appendChild(episodeButton);
            episodeList.appendChild(episodeListItem);
        });

        episodesButton.addEventListener('click', () => {
            const episodeList = document.getElementById('episode-list');
            const isExpanded = episodeList.classList.contains('expanded');

            if (isExpanded) {
                episodeList.classList.remove('expanded');
                episodeList.style.maxHeight = '200px';
                episodesButton.textContent = 'View All Episodes';
            } else {
                episodeList.classList.add('expanded');
                episodeList.style.maxHeight = 'none';
                episodesButton.textContent = 'Collapse Episode List';
            }
        });
    })
   