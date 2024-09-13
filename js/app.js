document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready!');

    const movieSearchButton = document.getElementById('movieSearchButton');
    const movieResultsContainer = document.getElementById('movieResults');
    const searchText = document.getElementById('searchText');



    document.querySelectorAll('.search-button').forEach(button => {
        button.addEventListener('click', function() {
            const searchTerm = this.dataset.searchTerm;
            searchFlickr(searchTerm);
        });
    });

    function searchFlickr(tag) {
        const apiKey = '29c05990843db5c5217b6a59c44a8f54';
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&format=json&nojsoncallback=1`;

        const loadingMessage = document.getElementById('loadingMessage');
        const imagesContainer = document.getElementById('imagesContainer');

        loadingMessage.style.display = 'block';
        imagesContainer.style.display = 'none';

        setTimeout(() => { 
            loadingMessage.style.display = 'none';
            imagesContainer.style.display = 'block';
            imagesContainer.innerHTML = ''; 

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    data.photos.photo.forEach(photo => {
                        const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
                        const imgElement = document.createElement('img');
                        imgElement.src = '../a3_pwa/icons/loader.gif';
                        imgElement.className = 'loader';
                        imagesContainer.appendChild(imgElement);

                        setTimeout(() => { 
                            imgElement.src = imageUrl;
                        }, 1500);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data from Flickr:', error);
                    imagesContainer.innerHTML = "<p>Cannot reach Flickr, try again later.</p>";
                });
        }, 2000);
    }
    document.getElementById('movieSearchButton').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchText').value;
        const worker = new Worker('js/webWorker.js');
        worker.postMessage(searchTerm);
        worker.onmessage = function(event) {
            document.getElementById('movieResults').innerHTML = event.data;
        };
    });
    
    document.getElementById('movieResults').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const movieId = event.target.dataset.id;
            const popup = document.getElementById('popup');
            const popupContent = document.getElementById('popupContent');
            popupContent.innerHTML = `Title: ${event.target.dataset.title}<br>Year: ${event.target.dataset.year}<br>Link: <a href="${event.target.dataset.link}" target="_blank">Script Link</a>`;
            popup.classList.remove('hidden');
        }
    });
    
    document.getElementById('closeButton').addEventListener('click', function() {
        const popup = document.getElementById('popup');
        popup.classList.add('hidden');
    });

    document.getElementById('popup').addEventListener('click', function() {
        this.classList.add('hidden');
    });
    
    document.body.addEventListener('click', function(event) {
        if (!document.getElementById('popup').contains(event.target) && event.target.id !== 'movieResults') {
            document.getElementById('popup').classList.add('hidden');
        }
    }, true);
});
