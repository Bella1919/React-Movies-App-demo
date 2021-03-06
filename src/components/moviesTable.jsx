import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';

//The child component of Movies.
//Cause we need put some method. So we have to use class to determin the sort order instead of SFC.
class MoviesTable extends Component {
   columns = [
       { 
           path:"title",
           label:"Title",
           content:movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
       { path:"genre.name",label:"Genre" },
       { path:"numberInStock",label:"Stock" },
       { path:"dailyRentalRate",label:"Rate" },
       { 
           key:"like",
           content: movie=>(
                <Like liked={movie.like} onLikeToggle={()=>this.props.onLike(movie)} />
        )},
       {    key:"delete",
            content: movie=>(
                <button
                    onClick = {()=>this.props.onDelete(movie)} 
                    className="btn btn-danger btn-sm">
                    Delete
                </button>
         )}
   ];
   
    render() { 
        const { movies, onSort, sortColumn} = this.props; 
        return ( 
            <Table 
            columns={this.columns}
            data = {movies}
            onSort={onSort}
            sortColumn={sortColumn}
            />
         );
    }
}
 
export default MoviesTable ;

//The TableBody also can write like below:
{/* <tbody> */}
    {/* //Remmber every time use the map have to give a unique key value to the li or tr... */}
//     {movies.map(movie=>(
//         <tr key={movie._id}>
//             <td>{movie.title}</td>
//             <td>{movie.genre.name}</td>
//             <td>{movie.numberInStock}</td>
//             <td>{movie.dailyRentalRate}</td>
//             <td>
//                 <Like liked={movie.like} onLikeToggle={()=>onLike(movie)} />
//             </td>
//             <td>
//                 <button
//                     onClick = {()=>onDelete(movie)} 
//                     className="btn btn-danger btn-sm"
//                 >
//                     Delete
//                 </button>
//             </td>
//         </tr>
//     ))}
// </tbody>