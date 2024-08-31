import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('movies/fetch-movies', async ({ apiUrl, page }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${apiUrl}&page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch movies failed:', error);
        return rejectWithValue(error.message);
    }
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: { results: [] }, // Initialize with an empty results array
        fetchStatus: '',
        currentPage: 1 // Track the current page
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies.results = [...state.movies.results, ...action.payload.results]; // Append new results
            state.fetchStatus = 'success';
            state.currentPage += 1; // Increment the page
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading';
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error';
        });
    }
});

export default moviesSlice;
