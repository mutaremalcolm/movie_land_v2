import { useEffect, useState } from 'react';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants';

import './app.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Header from './components/Header';
import Movies from './components/Movies';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import YouTubePlayer from './components/YoutubePlayer';
import InfiniteScroll from 'react-infinite-scroll-component';


const App = () => {
  // TODO: refactor
  const state = useSelector((state) => state);
  const { movies } = state.movies;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate();

  const closeModal = () => setOpen(false);

  const closeCard = () => {
    // Handle close card logic if necessary
  };

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate('/');
    getSearchResults(query);
  };

  const getMovies = async () => {
    const apiUrl = searchQuery ? `${ENDPOINT_SEARCH}&query=` + searchQuery : ENDPOINT_DISCOVER;
    // Fetch the current page from the state
    const page = state.movies.currentPage; 
  
    const response = await dispatch(fetchMovies({ apiUrl, page }));
  
    if (response.payload && response.payload.results.length === 0) {
      // No more movies to load
      setHasMore(false); 
    }
  };
  

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL)
      .then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };
  
  useEffect(() => {
    getMovies();
  }, [searchQuery]);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="container">
        <div className="modal">
          <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} closeOnEscape>
            {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <div style={{ padding: "30px" }}>
                <h6>No trailer available. Try another movie</h6>
              </div>
            )}
            <button className="btn btn-primary close-button" onClick={closeModal} type="button">
              Close
            </button>
          </Popup>
          <InfiniteScroll
            dataLength={movies?.length || 0}
            next={getMovies}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />
          </InfiniteScroll>
        </div>

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
