document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and display anime data
    function loadAnimeData() {
        fetch('/data/animeData.json')
            .then(response => response.json())
            .then(animeData => {
                const popularContainer = document.querySelector('.popular');

                animeData.forEach(anime => {
                    const animeDiv = document.createElement('div');
                    animeDiv.classList.add('anime-card');

                    const animeImage = document.createElement('img');
                    animeImage.src = anime.image;
                    animeImage.alt = anime.title;

                    const animeTitle = document.createElement('h3');
                    animeTitle.textContent = anime.title;

                    const animeDescription = document.createElement('p');
                    animeDescription.textContent = anime.description;

                    const animeButton = document.createElement('button');
                    animeButton.textContent = "View Details";
                    animeButton.addEventListener('click', function() {
                        window.location.href = `/animeDetails.html?id=${anime.id}`;
                    });

                    animeDiv.appendChild(animeImage);
                    animeDiv.appendChild(animeTitle);
                    animeDiv.appendChild(animeDescription);
                    animeDiv.appendChild(animeButton);

                    popularContainer.appendChild(animeDiv);
                });
            })
            .catch(error => console.error('Error fetching anime data:', error));
    }

    // Load anime data when the page is ready
    loadAnimeData();
});