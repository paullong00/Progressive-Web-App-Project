document.addEventListener('DOMContentLoaded', () => {
    const worker = new Worker('js/webWorker.js');
    const resultsContainer = document.getElementById('movieResults');

    worker.onmessage = function(event) {
        const movies = event.data;
        const resultsContainer = document.getElementById('movieResults');
        const searchCount = document.getElementById('searchCount');
        
        // Displaying search results
        resultsContainer.innerHTML = movies.map(movie =>
            `<button onclick="displayMovieDetails(this)" data-movie='${JSON.stringify(movie)}'>${movie.title}</button>`
        ).join('');
        
        // Updating search results count
        searchCount.textContent = `${movies.length} result(s) found.`;
    };
    

    document.getElementById('searchButton').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchText').value;
        worker.postMessage(searchTerm);
    });
});
