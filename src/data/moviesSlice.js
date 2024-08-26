import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('movies/fetch-movies', async (apiUrl, { rejectWithValue}) => {
    // wrap api call in a try catch block for better error handling & better diagnosis
  try{
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return await response.json();
    }catch (error) {
        console.error('Fetch movies failed:', error);
        return rejectWithValue(error.message);
    }
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
