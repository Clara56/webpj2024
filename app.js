
const apiKey = '624955a25e97ad8263efa29e8bed9ac3';

const fetchMovies = async (query) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

const displayMovies = (movies) => {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = movies.map(movie => `
        <div class="movie">
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="more-info-link">More Info</a>
        </div>
    `).join('');
};

document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    fetchMovies(query).then(displayMovies);
});

