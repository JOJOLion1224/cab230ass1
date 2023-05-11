import React, { useEffect, useState } from 'react';

function useMovies(text = '', year = '') {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const titleParam = text ? `title=${encodeURIComponent(text)}` : '';
        const yearParam = year && year !== 'any year' ? 
            `year=${encodeURIComponent(year)}` : '';
        const queryParams = [titleParam, yearParam].filter(Boolean).join('&');

        fetch(`http://sefdb02.qut.edu.au:3000/movies/search?${queryParams}`)    
        .then((res) => res.json())
        .then((res) => res.data)
        .then((movies) =>
            movies.map((movie) => {
                return {
                    title: movie.title,
                    year: movie.year,
                    imdbrating: movie.imdbRating,
                    rottentomatoes: movie.rottenTomatoesRating,
                    metacritic: movie.metacriticRating,
                    rated: movie.classification,
                    imdbid: movie.imdbID
                };
            })
        )
        .then(movies => {
            setMovies(movies);
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [text, year]);

    if (isLoading) {
        return <p>Loading movies... ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return {
        movies,
        isLoading,
        error
    };
};

export default useMovies;