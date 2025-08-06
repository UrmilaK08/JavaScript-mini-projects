let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
    let movieName = movieNameRef.value.trim();
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${key}`;

    if (movieName.length === 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
        return;
    }

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response === "False") {
                result.innerHTML = `<h3 class="msg">Movie Not Found</h3>`;
                return;
            }

            result.innerHTML = `
                <div class="info">
                    <img src="${data.Poster}" class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="img.png" alt="Rating">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <p><strong>Rated:</strong> ${data.Rated}</p>
                        <p><strong>Year:</strong> ${data.Year}</p>
                        <p><strong>Runtime:</strong> ${data.Runtime}</p>
                        <p><strong>Genre:</strong> ${data.Genre}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <p><strong>Actors:</strong> ${data.Actors}</p>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Something went wrong</h3>`;
        });
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
