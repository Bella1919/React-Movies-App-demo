import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies,deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import {paginate} from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './common/searchBox';



class Movies extends Component {
    //Movie Data pass in
    state = {
       movies:[],
       //we can use same way like movies but in really word we need to pass the data from back-end.
       genres:[],
       currentPage:1,
       pageSize:4,
       searchQuery:"",
       selectedGenre:null,
       sortColumn:{path:"title", order:"asc"}
    };
    //We use componentDidMount to get new data after rendering
    async componentDidMount(){
        const {data} = await getGenres()
        const genres = [{_id:"", name:"All Genres"},...data]

        const {data:movies} = await getMovies()
        this.setState({
            movies,
            //after const genres we replace getGenres() to genres property
            //And cause the key and value are same genres:genres so we can short for genres
            genres
        });
    }
    //When the handleDelete has a argument 'movie' have to change the callway
    //to arrow function call as well to pass the argument.
    handleDelete =async (movie)=>{
        const originalMovies = this.state.movies

        const movies = originalMovies.filter(m=>m._id!==movie._id);
        //In ES6 can short movies=movies to movies
        this.setState({movies})
        try{
            await deleteMovie(movie._id)
        }
        catch(ex){
            if(ex.response&&ex.response.status===404)
                toast.error('This movie has already been deleted.')
            
            this.setState({ movies:originalMovies })
        }
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
    handleGenreSelect=(genre)=>{
        //we can ignore the currentPage:1， save it just cause might others need in future
        this.setState({selectedGenre: genre, searchQuery:"", currentPage:1 });
    };
    //query its a string, that is string of user tap into the input filde.
    handleSearch = query =>{
        this.setState({searchQuery:query, selectedGenre:null, currentPage:1});
    };
    
    handleSort =(sortColumn)=>{
        
        this.setState({sortColumn});
    };
    //encapsulate the method
    getPagedData = () =>{
        const { 
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            movies:allMovies
        } = this.state;

        //First,filtered to filter movies of genre first.
        // const filtered = 
        //     selectedGenre && selectedGenre._id
        //     ? allMovies.filter(m=>m.genre._id === selectedGenre._id) 
        //     : allMovies;
        //After we add the searchBox we change the filter like below:
        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m=>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if(selectedGenre && selectedGenre._id)
                filtered = allMovies.filter(m=>m.genre._id === selectedGenre._id);
        //Second, sorting have to after filter Genre.
        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
        //Third, paginnation. Pass data to {paginate}
        const movies = paginate( sorted, currentPage, pageSize );

        return {totalCount:filtered.length,data:movies};
    }

    render() { 
        //Put the prpperty 'length' in to a object variable destructure.
        const {length:count} = this.state.movies;
        const { 
            pageSize,
            currentPage,
            sortColumn,
            searchQuery
        } = this.state;
        //if there has movies render everything else just render one sentence as below:
        if(count===0) 
        return <p>There are no movies in the database.</p>;
        //else can ignore.
        else{
            const { totalCount, data:movies } = this.getPagedData();
            return (
                <div className="row">
                    <div className="col-3">
                        <ListGroup 
                            items={this.state.genres} 
                            //cause the child component listGroup use the default props, so here dont need to pass the property to child.
                            // textProperty = "name"
                            // valueProperty = "_id"
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect} 
                        />
                    </div>
                    <div className="col">                      
                        <Link to="/movies/new" className="btn btn-primary mb-2"> 
                        New Movie
                        </Link>                      
                        {/* instead pass use movies.length we can use dynamic property filter.length  */}
                        <p>Showing {totalCount} movies in the database.</p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        <MoviesTable 
                            movies={movies} 
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete} 
                            onLike={this.handleLike}
                            onSort={this.handleSort} 
                        />
                        {/* instead pass use movies.length we can use dynamic property filter.length  */}
                        <Pagination itemsCount={totalCount} 
                                    // pageSize={10}
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    onPageChange={this.handlePageChange} 
                        />
                    </div>
                </div>
            );
        }
    }
}
 
export default Movies;