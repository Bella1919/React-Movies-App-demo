import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
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