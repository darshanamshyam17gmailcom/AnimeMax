// Get the anime ID and episode number from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('animeId');
const episodeNumber = urlParams.get('episodeNumber');

// Fetch the anime data from the JSON file
fetch('/data/animeData.json')
    .then(response => response.json())
    .then(animeData => {
        // Find the anime with the matching ID
        const anime = animeData.find(anime => anime.id === parseInt(animeId));

        // Display the anime title and episode number
        document.getElementById('anime-title').textContent = anime.title;
        document.getElementById('episode-number').textContent = `Episode ${episodeNumber}`;

        // Find the episode with the matching number
        const episode = anime.episodes.find(episode => episode.number === parseInt(episodeNumber));

        // Display the episode video
        const episodeIframe = document.getElementById('episode-iframe');
        episodeIframe.src = episode.link;
    })
    .catch(error => console.error('Error fetching anime data:', error));