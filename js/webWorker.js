importScripts('../data/movieObj.js'); 



self.onmessage = function(e) {
    const searchTerm = e.data.toLowerCase();
    const results = Object.values(movieData).filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );
    
    self.postMessage(results);
};
