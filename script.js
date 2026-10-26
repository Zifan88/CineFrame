"use strict";

const movies = [
    {
        id: 1,
        title: "The Last Horizon",
        year: 2026,
        genre: "Action",
        language: "English",
        rating: 4.8,
        poster: "Beyond the Last Horizon.png",
        description:
            "A group of explorers faces an impossible journey beyond the edge of the known world."
    },

    {
        id: 2,
        title: "Neel Akash",
        year: 2026,
        genre: "Drama",
        language: "Bangla",
        rating: 4.6,
        poster: "নীল আকাশ_ A Riverside Dream.png",
        description:
            "A quiet story about dreams, family and finding hope when everything feels uncertain."
    },

    {
        id: 3,
        title: "City of Dreams",
        year: 2025,
        genre: "Romance",
        language: "Hindi",
        rating: 4.7,
        poster: "City of Dreams Romantic Poster.png",
        description:
            "Two strangers meet in a crowded city and discover that their dreams are connected."
    },

    {
        id: 4,
        title: "Dark Signal",
        year: 2026,
        genre: "Thriller",
        language: "English",
        rating: 4.5,
        poster: "Dark Signal_ City of Shadows.png",
        description:
            "A mysterious signal appears every night, leading a young journalist toward a hidden truth."
    },

    {
        id: 5,
        title: "Moner Janala",
        year: 2025,
        genre: "Romance",
        language: "Bangla",
        rating: 4.4,
        poster: "Moner Janala_ A Sunset Romance.png",
        description:
            "A heartfelt story of love, memories and the choices that shape our lives."
    },

    {
        id: 6,
        title: "The Silent Room",
        year: 2025,
        genre: "Horror",
        language: "English",
        rating: 4.3,
        poster: "The Silent Room_ House Thirteen.png",
        description:
            "A family moves into an old house where one locked room hides a disturbing secret."
    },

    {
        id: 7,
        title: "Safar",
        year: 2026,
        genre: "Drama",
        language: "Hindi",
        rating: 4.6,
        poster: "Safar_ A Journey Beyond Mountains.png",
        description:
            "A young traveler leaves everything behind to discover what truly matters in life."
    },

    {
        id: 8,
        title: "Laughing Street",
        year: 2026,
        genre: "Comedy",
        language: "Hindi",
        rating: 4.2,
        poster: "Laughing Street Friendship Poster.png",
        description:
            "A group of friends accidentally turns an ordinary neighborhood into complete chaos."
    }
];




const movieGrid =
    document.getElementById("movieGrid");

const latestMovieGrid =
    document.getElementById("latestMovieGrid");

const watchlistGrid =
    document.getElementById("watchlistGrid");

const watchlistEmpty =
    document.getElementById("watchlistEmpty");

const genreButtons =
    document.querySelectorAll(
        ".genre-button"
    );

const themeToggle =
    document.getElementById("themeToggle");

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchMessage =
    document.getElementById("searchMessage");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");




let watchlist =
    JSON.parse(
        localStorage.getItem(
            "cineframe-watchlist"
        )
    ) || [];



function createStars(rating) {

    const fullStars =
        Math.round(rating);

    let stars = "";

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= fullStars) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;
}




function createMovieCard(movie) {

    const isSaved =
        watchlist.includes(movie.id);


    return `
        <article
            class="movie-card"
            data-id="${movie.id}"
        >

            <div class="movie-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title} poster"
                    loading="lazy"
                    onerror="this.src='The Last Horizon_ Cinematic Streaming Hero.png'"
                >

                <span class="movie-rating">
                    ⭐ ${movie.rating}/5
                </span>

                <span class="movie-language">
                    ${movie.language}
                </span>

            </div>


            <div class="movie-content">

                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-info">

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        ${movie.genre}
                    </span>

                </div>


                <div class="star-rating">

                    ${createStars(
                        movie.rating
                    )}

                </div>


                <p class="movie-description">
                    ${movie.description}
                </p>


                <div class="movie-actions">

                    <button
                        class="watch-button"
                        onclick="watchMovie(${movie.id})"
                    >
                        ▶ Watch
                    </button>


                    <button
                        class="download-button"
                        onclick="downloadMovie(${movie.id})"
                    >
                        ↓ Download
                    </button>

                </div>


                <button
                    class="watchlist-button ${
                        isSaved
                            ? "saved"
                            : ""
                    }"
                    onclick="toggleWatchlist(${movie.id})"
                >

                    ${
                        isSaved
                            ? "♥ Saved"
                            : "♡ Add to Watchlist"
                    }

                </button>

            </div>

        </article>
    `;
}




function renderMovies(movieList) {

    if (!movieGrid) return;


    if (movieList.length === 0) {

        movieGrid.innerHTML = `
            <div class="no-results">

                <div class="no-results-icon">
                    🎬
                </div>

                <h3>
                    No movies found
                </h3>

                <p>
                    Try selecting another genre.
                </p>

            </div>
        `;

        return;
    }


    movieGrid.innerHTML =
        movieList
            .map(createMovieCard)
            .join("");
}




function renderLatestMovies() {

    if (!latestMovieGrid) return;


    const latestMovies =
        [...movies]
            .sort(
                (a, b) =>
                    b.year - a.year
            )
            .slice(0, 4);


    latestMovieGrid.innerHTML =
        latestMovies
            .map(createMovieCard)
            .join("");
}



genreButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            genreButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add(
                "active"
            );


            const selectedGenre =
                button.dataset.genre;


            if (
                selectedGenre ===
                "All"
            ) {

                renderMovies(movies);

                return;
            }


            const filteredMovies =
                movies.filter(
                    movie =>
                        movie.genre ===
                        selectedGenre
                );


            renderMovies(
                filteredMovies
            );

        }
    );

});




function toggleWatchlist(movieId) {

    const movieExists =
        watchlist.includes(
            movieId
        );


    if (movieExists) {

        watchlist =
            watchlist.filter(
                id =>
                    id !== movieId
            );

    } else {

        watchlist.push(
            movieId
        );

    }


    localStorage.setItem(
        "cineframe-watchlist",
        JSON.stringify(
            watchlist
        )
    );


    renderMovies(
        getCurrentMovies()
    );

    renderLatestMovies();

    renderWatchlist();
}




function getCurrentMovies() {

    const activeButton =
        document.querySelector(
            ".genre-button.active"
        );


    if (
        !activeButton ||
        activeButton.dataset.genre ===
            "All"
    ) {

        return movies;
    }


    return movies.filter(
        movie =>
            movie.genre ===
            activeButton.dataset.genre
    );
}


function renderWatchlist() {

    if (
        !watchlistGrid ||
        !watchlistEmpty
    ) {

        return;
    }


    const savedMovies =
        movies.filter(
            movie =>
                watchlist.includes(
                    movie.id
                )
        );


    if (
        savedMovies.length === 0
    ) {

        watchlistEmpty.style.display =
            "block";

        watchlistGrid.innerHTML =
            "";

        return;
    }


    watchlistEmpty.style.display =
        "none";


    watchlistGrid.innerHTML =
        savedMovies
            .map(createMovieCard)
            .join("");
}



function watchMovie(movieId) {

    const movie =
        movies.find(
            item =>
                item.id === movieId
        );


    if (!movie) return;


    alert(
        `Opening "${movie.title}"...`
    );
}



function downloadMovie(movieId) {

    const movie =
        movies.find(
            item =>
                item.id === movieId
        );


    if (!movie) return;


    alert(
        `No authorized download source is connected for "${movie.title}" yet.`
    );
}



function openSearch() {

    searchOverlay.classList.add(
        "show"
    );

    setTimeout(
        () =>
            searchInput.focus(),
        100
    );
}


function closeSearchOverlay() {

    searchOverlay.classList.remove(
        "show"
    );

    searchInput.value = "";

    searchMessage.textContent = "";
}


searchButton.addEventListener(
    "click",
    openSearch
);


closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);


searchOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            searchOverlay
        ) {

            closeSearchOverlay();

        }

    }
);




searchInput.addEventListener(
    "input",
    () => {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchTerm) {

            searchMessage.textContent =
                "";

            renderMovies(
                movies
            );

            return;
        }


        const results =
            movies.filter(
                movie =>
                    movie.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )
            );


        if (
            results.length === 0
        ) {

            searchMessage.textContent =
                `We couldn't find "${searchInput.value}" in CineFrame.`;

            return;
        }


        searchMessage.textContent =
            `${results.length} movie${
                results.length > 1
                    ? "s"
                    : ""
            } found.`;


        renderMovies(
            results
        );

    }
);




const savedTheme =
    localStorage.getItem(
        "cineframe-theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent =
        "☀";

} else {

    themeToggle.textContent =
        "☾";
}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "cineframe-theme",
            isDark
                ? "dark"
                : "light"
        );


        themeToggle.textContent =
            isDark
                ? "☀"
                : "☾";

    }
);




menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "show"
        );

    }
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "show"
                );

            }
        );

    });


document.addEventListener(
    "click",
    event => {

        const clickedInsideMenu =
            mobileMenu.contains(
                event.target
            );

        const clickedMenuButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            mobileMenu.classList.remove(
                "show"
            );

        }

    }
);




renderMovies(movies);

renderLatestMovies();

renderWatchlist();