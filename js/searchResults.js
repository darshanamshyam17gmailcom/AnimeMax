document.addEventListener('DOMContentLoaded', () => {
    const searchResultsContainer = document.querySelector('.search-results');
    const errorMessageElement = document.createElement('p');
    errorMessageElement.classList.add('error-message');
  
    async function fetchAnimeDetails(searchTerm) {
      try {
        // Replace this path with the actual location of your animeData.json file (if applicable)
        const response = await fetch(`/data/animeData.json`);
        if (!response.ok) {
          throw new Error(`Error fetching anime data: ${response.statusText}`);
        }
        const animeData = await response.json();
  
        // Filter data based on search term (if using local JSON)
        const filteredAnime = animeData.filter(anime => anime.title.toLowerCase().includes(searchTerm));
        return filteredAnime;
  
      } catch (error) {
        console.error('Error fetching anime details:', error);
        errorMessageElement.textContent = 'An error occurred while fetching anime data. Please try again later.';
        searchResultsContainer.appendChild(errorMessageElement);
        return [];
      }
    }
  
    async function displaySearchResults(searchTerm) {
      searchResultsContainer.innerHTML = ''; // Clear any previous content
  
      const animeList = await fetchAnimeDetails(searchTerm);
  
      if (animeList.length === 0) {
        errorMessageElement.textContent = 'No results found for your search.';
        searchResultsContainer.appendChild(errorMessageElement);
        return;
      }
  
      const searchResultsHTML = animeList.map(createSearchResult).join('');
      searchResultsContainer.innerHTML = searchResultsHTML;
    }
  
    function createSearchResult(anime) {
      const result = document.createElement('a');
      result.classList.add('search-result');
      result.href = `animeDetails.html?id=${anime.id}`; // Assuming details page takes id parameter
  
      result.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" class="search-result-image">
        <div class="search-result-info">
          <h3 class="search-result-title">${anime.title}</h3>
          <p class="search-result-description">${anime.description}</p>
        </div>
      `;
  
      return result.outerHTML;
    }
  
    // Function to display details of a selected anime (assuming details page)
    async function displayAnimeDetails() {
      const urlParams = new URLSearchParams(window.location.search);
      const animeId = urlParams.get('id');
      if (!animeId) {
        return; // No ID in URL, likely search results page
      }
  
      const animeDetailsContainer = document.querySelector('.anime-details');
      animeDetailsContainer.innerHTML = ''; // Clear any previous content
  
      const animeDetails = await fetchAnimeDetails(animeId); // Reuse fetch logic
  
      if (!animeDetails) {
        return; // Error message already displayed in fetchAnimeDetails
      }
  
      const detailsHTML = createAnimeDetails(animeDetails);
      animeDetailsContainer.innerHTML = detailsHTML;
    }
  
    function createAnimeDetails(anime) {
      return `
      <h2>${anime.title}</h2>
      <img src="${anime.image}" alt="${anime.title}" class="anime-details-image">
      <p class="anime-details-description">${anime.description}</p>
      `;
    }
  
    // Check for search term in URL (assuming search results page)
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    if (searchTerm) {
      displaySearchResults(searchTerm);
    } else {
      // Call displayAnimeDetails if on details page (has animeId)
      displayAnimeDetails();
    }
  });
  