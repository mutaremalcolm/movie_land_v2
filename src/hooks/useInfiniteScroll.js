import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';

const useInfiniteScroll = (searchQuery, debounceDelay = 300) => {
    const dispatch = useDispatch();
    const { totalPages } = useSelector((prevState) => prevState.movies);

    const [page, setPage] = useState(1);

    const getMovies = useCallback((query) => {
        if (query && query !== '') {
            dispatch(fetchMovies({ page, query }));
        } else {
            dispatch(fetchMovies({ page, query: null }));
        }
    }, [dispatch, page]);

    useEffect(() => {
        let debounceTimeout;

        const handleScroll = () => {
            debounceTimeout = setTimeout(() => {
                if (
                    window.innerHeight + window.pageYOffset
                    >= document.documentElement.offsetHeight
                ) {
                    setPage((prevPage) => {
                        if (prevPage < totalPages) {
                            return prevPage + 1;
                        }
                        return prevPage;
                    });
                }
            }, debounceDelay);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(debounceTimeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [debounceDelay, totalPages]);

    useEffect(() => {
        getMovies(searchQuery);
    }, [page, getMovies]);

    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        } else {
            getMovies(searchQuery);
        }
    }, [searchQuery, getMovies]);
};

export default useInfiniteScroll;
