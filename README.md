# webpj2024

# Movie Recommendation Website

Welcome to the **Movie Recommendation Website**! This web application enables users to explore and discover movies through a user-friendly interface. Users can search for movies by title, filter by language, and browse recommendations based on genres like Comedy, Horror, and Romance.

## Features

- **Search Movies**: Search for movies using a keyword and view details including TMDB and IMDb ratings, description, and poster.
- **Genre Recommendations**: Browse movies by genre with an interactive slideshow featuring popular Comedy, Horror, and Romance movies.
- **Language Filters**: Filter movie search results by language (e.g., English, Korean, Chinese, Japanese, and more).
- **Interactive Design**: A visually engaging interface with animations like moving clouds and a vibrant rainbow background.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling and layout of the website.
- **JavaScript**: To handle API requests and dynamic user interactions.
- **APIs**:
  - [TMDB API](https://developers.themoviedb.org/3): Fetch movie details and metadata.
  - [OMDB API](https://www.omdbapi.com/): Retrieve IMDb ratings for movies.

## How to Use

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/movie-recommendation-website.git
   ```

2. Navigate to the project directory and open the `index.html` file in your preferred browser.

3. Click the **Start** button on the landing page to access the search and browse features.

4. Use the search bar to find movies by title or browse genre-specific recommendations.

## Directory Structure

```
├── index.html       # Landing page
├── search.html      # Search and browse movies page
├── styles.css       # Styling for the website
├── app.js           # JavaScript functionality
├── README.md        # Documentation file
```

## API Configuration

To use this project, you need API keys for TMDB and OMDB. Follow these steps:

1. Sign up for API keys:
   - [TMDB API Key](https://www.themoviedb.org/signup)
   - [OMDB API Key](https://www.omdbapi.com/apikey.aspx)

2. Replace placeholders in the `app.js` file:
   ```javascript
   const apiKeyTMDB = "your-tmdb-api-key";
   const apiKeyOMDB = "your-omdb-api-key";
   ```

3. Save the changes and refresh the website.

## Future Improvements

- Add user authentication for personalized recommendations.
- Include more advanced filtering options (e.g., year, rating, and runtime).
- Enhance the UI with responsive design for mobile and tablet devices.
- Implement a backend to store user preferences and watchlists.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and share this project as per the license.

---
