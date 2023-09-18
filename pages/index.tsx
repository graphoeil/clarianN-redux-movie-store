// Imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMovie, addToBasket, addToLikedMovies } from "../store";
import { Card, CardContent, CardActions, Button, Typography } from "@material-ui/core";
import { Favorite, FavoriteBorder, AddShoppingCart, RemoveShoppingCart } from "@material-ui/icons";

// RootState (better practice)
// For replacing in TS definition in Store useSelector
// const movies = useSelector((store:{ movies:{ title:string; inBasket:boolean; liked:boolean; }[]; }) => { return store.movies });
// const basket = useSelector((store:{ basket:string[]; }) => { return store.basket; });
// const likedMovies = useSelector((store:{ likedMovies:string[]; }) => { return store.likedMovies; });
interface RootState {
	movies:{
		title:string;
		inBasket:boolean;
		liked:boolean;
	}[];
	basket:string[];
	likedMovies:string[];
};

// Component
const Home = () => {

	// State
	const [movieTitle, setMovieTitle] = useState('');

	// Store
	// Selectors that return the entire state are almost certainly a mistake, 
	// as they will cause a rerender whenever *anything* in state changes. !!
	// We don't destructure movies because we access the variable directly
	// from the store ;-)
	// Here movies with TS, movies is an Array of object {}[] !
	const movies = useSelector((store:RootState) => { return store.movies });
	const basket = useSelector((store:RootState) => { return store.basket; });
	const likedMovies = useSelector((store:RootState) => { return store.likedMovies; });

	// Dispatch
	const dispatch = useDispatch();

	// Add new movie
	const handleAddMovie = () => {
		const newMovie = {
			title:movieTitle,
			inBasket:false,
			liked:false
		};
		dispatch(addMovie(newMovie));
		setMovieTitle('');
	};

	// Add to basket
	const handleAddToBasket = (title:string) => {
		dispatch(addToBasket(title));
	};

	// Like movie
	const handleAddToLikedMovie = (title:string) => {
		dispatch(addToLikedMovies(title));
	};
 
	// Return
	return(
		<div className="container">
			<div>
				<h1>My Movie List</h1>
			</div>
			<div className="addMovie">
				<input type="text" placeholder="Enter a movie title" 
					value={ movieTitle } 
					onChange={ (e) => { setMovieTitle(e.target.value); } }/>
				<button onClick={ handleAddMovie }>
					Add movie
				</button>
			</div>
			<h2>My Movies</h2>
			<ul className="movieList">
				{
					movies.map((movie, index) => {
						// Variables
						const { title, inBasket, liked } = movie;
						// Return
						return(
							<Card className="movieCard" key={ index }>
								<CardContent>
									<Typography variant="h5" component="h2">
										{ title }
									</Typography>
								</CardContent>
								<CardActions className="cardActions">
									<Button startIcon={ movie.inBasket ? <RemoveShoppingCart/> : <AddShoppingCart/> }
										onClick={ () => { handleAddToBasket(title); } }>
										{ inBasket ? 'Remove from basket' : 'Add to basket' }
									</Button>
									<Button startIcon={ movie.liked ? <Favorite/> : <FavoriteBorder/> }
										onClick={ () => { handleAddToLikedMovie(title); } }>
										{ liked ? 'Dislike' : 'Like' }
									</Button>
								</CardActions>
							</Card>
						);
					})
				}
			</ul>
			<h2>My Basket ({ basket.length })</h2>
			<ul>
				{
					basket.map((movie, index) => {
						return <li key={ index }>{ movie }</li>;
					})
				}
			</ul>
			<h2>Liked Movies ({ likedMovies.length })</h2>
			<ul>
				{
					likedMovies.map((movie, index) => {
						return <li key={ index }>{ movie }</li>;
					})
				}
			</ul>
		</div>
	);

};

// Export
export default Home;