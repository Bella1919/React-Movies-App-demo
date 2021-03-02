import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';

class Movies extends Component {
    //Movie Data pass in
    state = {
       movies:getMovies(),
       currentPage:1,
       pageSize:4
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
    handlePageChange = (page)=>{
        this.setState ({currentPage:page});
    };

    render() { 
        //Put the prpperty 'length' in to a object variable destructure.
        const {length:count} = this.state.movies;
        const { pageSize,currentPage,movies:allMovies} = this.state;
        if(count===0) 
        return <p>There are no movies in the database.</p>;
        //pass data to {paginate}
        const movies = paginate( allMovies,currentPage,pageSize );
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
                    {movies.map(movie=>(
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
            <Pagination itemsCount={count} 
                        // pageSize={10}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange} 
            />
        </React.Fragment>
        );
    }
}
 
export default Movies;