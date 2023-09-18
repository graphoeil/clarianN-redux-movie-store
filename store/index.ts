// Redux store (with RTK => configureStore)
import { createStore } from "redux";

// Types
type Movie = {
	title:string;
	inBasket:boolean;
	liked:boolean;
};
type State = {
	movies:Movie[];
	basket:string[];
	likedMovies:string[];
};
type Action = { type:'ADD_MOVIE'; payload:Movie } 
	| { type:'ADD_TO_BASKET'; payload:string; } 
	| { type:'ADD_TO_LIKED_MOVIE'; payload:string; }

// Initial state
const initialState:State = {
	movies:[
		{ title:'Alien', inBasket:false, liked:false },
		{ title:'Blade Runner', inBasket:false, liked:false },
		{ title:'Terminator', inBasket:false, liked:false },
		{ title:'Conan the barbarian', inBasket:false, liked:false }
	],
	basket:[],
	likedMovies:[]
};

// Reducer
const reducer = (state:State = initialState, action:Action):State => {
	// It's better to use if and else if ...
	switch (action.type) {
		case 'ADD_MOVIE':
			return { 
				...state, 
				movies:[...state.movies, action.payload] 
			};
		case 'ADD_TO_BASKET':
			// action.payload = movie title
			return {
				...state,
				// Movies
				movies:state.movies.map((movie) => {
					return movie.title === action.payload ? { ...movie, inBasket:!movie.inBasket } : movie;
				}),
				// Basket
				basket:state.basket.includes(action.payload) 
				? state.basket.filter((movie) => { return movie !== action.payload }) 
				: [...state.basket, action.payload]
			};
		case 'ADD_TO_LIKED_MOVIE':
			// If the movie is in likedMovies we remove with filter else we add it
			// action.payload = movie title
			return {
				...state,
				// Movies
				movies:state.movies.map((movie) => {
					return movie.title === action.payload ? { ...movie, liked:!movie.liked } : movie;
				}),
				// Liked movies
				likedMovies:state.likedMovies.includes(action.payload) 
				? state.likedMovies.filter((movie) => { return movie !== action.payload; }) 
				: [...state.likedMovies, action.payload]
			};
		default: return state;
	}
};

// Setup store and reducer
const store = createStore(reducer);

// Export store
export default store;