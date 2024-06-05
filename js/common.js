document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value.trim();
        if (searchInput !== '') {
           
            window.location.href = `/searchResults.html?searchTerm=${searchInput}`;
            // window.location.href = 'searchResults.html?searchTerm=${searchInput}'; 
            //[``]&[''] okka quote code chedadobbindi ra. 2hr thala patkunna.
           
        }
    });
});