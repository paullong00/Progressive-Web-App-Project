function displayMovieDetails(buttonElement) {
    console.log("Displaying details for movie:", buttonElement.dataset.movie);
    const movieDetails = JSON.parse(buttonElement.dataset.movie);
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');

    popupContent.innerHTML = `
        <strong>Title:</strong> ${movieDetails.title}<br>
        <strong>Year:</strong> ${movieDetails.year}<br>
        <strong>Link:</strong> <a href="${movieDetails.link}" target="_blank">Script Link</a>
    `;
    popup.style.display = 'block';
}


