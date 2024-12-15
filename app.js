const apiKeyTMDB = '624955a25e97ad8263efa29e8bed9ac3'; 
const apiKeyOMDB = '73ee7b4b'; 

// Fetch movies based on search query
const fetchMovies = async (query) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDB}&query=${query}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching movies from TMDB:", error);
    }
};

// Fetch IMDb rating for a movie
const fetchIMDBRating = async (title) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${encodeURIComponent(title)}`);
        const data = await response.json();
        return data.imdbRating || 'N/A';
    } catch (error) {
        console.error("Error fetching IMDb rating:", error);
        return 'N/A';
    }
};

// Display movies on the page
const displayMovies = async (movies) => {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear previous results

    if (movies && movies.length > 0) {
        for (const movie of movies) {
            // Fetch IMDb rating for each movie
            const imdbRating = await fetchIMDBRating(movie.title);

            const movieElement = `
                <div class="movie">
                    <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                    </a>
                    <h3>${movie.title}</h3>
                    <p>TMDB Rating: ${movie.vote_average} ⭐</p>
                    <p>IMDb Rating: ${imdbRating} ⭐</p>
                    <p>Description: ${movie.overview || 'No description available.'}</p>
                    <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="more-info-link">More Info</a>
                </div>
            `;
            movieList.innerHTML += movieElement;
        }
    } else {
        movieList.innerHTML = '<p>No movies found for this search.</p>';
    }
};

// Fetch genre-based movies
const fetchGenreMovies = async (genre, language) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKeyTMDB}&with_genres=${genre}&language=${language}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching genre-based movies:", error);
    }
};

// Create genre-based movie slideshow
const createSlideshow = async (language = 'en') => {
    const genres = { "Comedy": 35, "Horror": 27, "Romance": 10749 };
    const slideshowContainer = document.getElementById('movie-slideshow');
    slideshowContainer.innerHTML = ''; // Clear previous content

    for (const genre in genres) {
        const genreMovies = await fetchGenreMovies(genres[genre], language);
        const slides = genreMovies.slice(0, 7); // Show 5 movies per genre

        // Create a genre section
        const genreSection = document.createElement('div');
        genreSection.classList.add('genre-section');

        // Add a title for the genre
        const genreTitle = document.createElement('h2');
        genreTitle.textContent = genre;
        genreSection.appendChild(genreTitle);

        // Create movie slides for each genre
        slides.forEach((movie) => {
            const slideElement = `
                <div class="slide">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                    <div class="slide-caption">${movie.title}</div>
                </div>
            `;
            genreSection.innerHTML += slideElement;
        });

        // Append the genre section to the slideshow container
        slideshowContainer.appendChild(genreSection);
    }
};

// Filter movies by language
const filterMoviesByLanguage = (movies, language) => {
    if (language === "Other") {
        return movies.filter(movie =>
            !["en", "ko", "zh", "ja"].includes(movie.original_language)
        );
    }
    return movies.filter(movie => movie.original_language === language);
};

// Create language filter buttons
const createFilterButtons = (movies) => {
    const filterContainer = document.getElementById('language-filters');
    const languages = ["English", "Korean", "Chinese", "Japanese", "Other"];
    const languageCodes = { "English": "en", "Korean": "ko", "Chinese": "zh", "Japanese": "ja", "Other": "Other" };

    filterContainer.innerHTML = languages.map(language => 
        `<button class="filter-button" data-language="${languageCodes[language]}">${language}</button>`
    ).join('');

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const selectedLanguage = event.target.getAttribute('data-language');
            const filteredMovies = filterMoviesByLanguage(movies, selectedLanguage);
            displayMovies(filteredMovies);

            // Refresh the slideshow with the selected language
            await createSlideshow(selectedLanguage);
        });
    });
};

// Event listener for search form submission
document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        const movies = await fetchMovies(query);
        displayMovies(movies);
        createFilterButtons(movies); // Recreate filter buttons after the search
    }
});

// Initialize the page with the slideshow
createSlideshow();

