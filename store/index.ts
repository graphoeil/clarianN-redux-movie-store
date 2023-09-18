// Redux store (with RTK => configureStore)
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

// Types
interface Movie {
	title:string;
	inBasket:boolean;
	liked:boolean;
};
interface MovieState {
	movies:Movie[];
	basket:string[];
	likedMovies:string[];
};

// Initial state
const initialState:MovieState = {
	movies:[
		{ title:'Alien', inBasket:false, liked:false },
		{ title:'Blade Runner', inBasket:false, liked:false },
		{ title:'Terminator', inBasket:false, liked:false },
		{ title:'Conan the barbarian', inBasket:false, liked:false }
	],
	basket:[],
	likedMovies:[]
};

// Slice
const movieSlice = createSlice({
	name:'movies',
	initialState,
	reducers:{
		// Add movie
		addMovie:(state, action:PayloadAction<Movie>) => {
			state.movies.push(action.payload);
		},
		// Add to basket
		addToBasket:(state, action:PayloadAction<string>) => {
			// Movies
			state.movies = state.movies.map((movie) => {
				if (movie.title === action.payload){
					return { ...movie, inBasket:!movie.inBasket }
				}
				return movie;
			});
			// Basket
			if (state.basket.includes(action.payload)){
				state.basket = state.basket.filter((movie) => {
					return movie !== action.payload;
				});
			} else {
				state.basket.push(action.payload);
			}
		},
		// Add to liked movie
		addToLikedMovies:(state, action:PayloadAction<string>) => {
			// Movies
			state.movies = state.movies.map((movie) => {
				if (movie.title === action.payload){
					return { ...movie, liked:!movie.liked };
				}
				return movie;
			});
			// Liked movies
			if (state.likedMovies.includes(action.payload)){
				state.likedMovies = state.likedMovies.filter((movie) => {
					return movie !== action.payload;
				});
			} else {
				state.likedMovies.push(action.payload);
			}
		}
	}
});

// Actions export
export const { addMovie, addToBasket, addToLikedMovies } = movieSlice.actions;

// Setup store and reducer
const store = configureStore({
	reducer:movieSlice.reducer
});

// Export store
export default store;