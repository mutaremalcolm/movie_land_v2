import Movie from './Movie';
import '../styles/movies.scss';

const Movies = ({ movies, viewTrailer, closeCard }) => {

    return (
        <div className="movies-grid" data-testid="movies">
            {/* Check if movies and results exist before trying to map over them */}
            {movies && movies.results?.length > 0 ? (
                movies.results.map((movie, index) => (
                    <Movie 
                        movie={movie} 
                        // Ensure the key is unique by adding the index
                        key={`${movie.id}-${index}`}  
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </div>
    );
}

export default Movies;
