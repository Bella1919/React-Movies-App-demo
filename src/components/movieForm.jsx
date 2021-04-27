import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';



//The child component of Movies
class MovieForm extends Form{
    state = {
        data:{
            title:"",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:""
        },
        genres:[],
        errors:{}
    };
    schema = {
        //_id dont set for required cause when we add new movies do not have _id property.
        _id:Joi.string(),
        title:Joi.string().required().label('Title'),
        genreId:Joi.string().required().label('Genre'),
        numberInStock:Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate:Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    };
    //componentDidMount will update after render
    componentDidMount(){
        const genres = getGenres();
        this.setState({genres});

        const movieId = this.props.match.params.id;
        if (movieId==='new') return;

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace("/not-found");

        this.setState({ data:this.mapToViewModel(movie) });
    };

    mapToViewModel(movie){
        return{
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };
    
    doSubmit = () =>{
        saveMovie(this.state.data);
        //history.push is a property of router, it can dump to anyone URL which you want to go.
        //Here after save movie, submit button can bring user back to movies.
        this.props.history.push("/movies");
    };

    render(){
        return ( 
            <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('title','Title')}
                {this.renderSelect('genreId','Genre',this.state.genres)} 
                {this.renderInput('numberInStock','Number in Stock','number')} 
                {this.renderInput('dailyRentalRate','Rate')} 
                {this.renderButton('Save')}
            </form>
        </div>
        );
    }
}
 
export default MovieForm;