import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like'

class Movies extends Component {
    //Movie Data pass in
    state = {
       movies:getMovies()
    };
    //When the handleDelete has a argument 'movie' have to change the callway
    //to arrow function call as well to pass the argument.
    handleDelete =(movie)=>{
        const movies = this.state.movies.filter(m=>m._id!==movie._id);
        //In ES6 can short movies=movies to movies
        this.setState({movies})
    };
    handleLike = (movie)=>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].like = !movies[index].like;
        this.setState({ movies });
    };

    render() { 
        //Put the prpperty 'length' in to a object variable.
        const {length:count} = this.state.movies;
        if(count===0) 
        return <p>There are no movies in the database.</p>;
        return (
        <React.Fragment>
            <p>Showing {count} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* //Remmber every time use the map have to give a unique key value to the li or tr... */}
                    {this.state.movies.map(movie=>(
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like liked={movie.like} onLikeToggle={()=>this.handleLike(movie)} />
                        </td>
                        <td>
                            <button
                                onClick = {()=>this.handleDelete(movie)} 
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </React.Fragment>
        );
    }
}
 
export default Movies;