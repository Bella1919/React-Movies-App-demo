import React,{Component} from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import Like from './common/like';


//Cause we need put some method. So we have to use class to determin the sort order instead of SFC.
class MoviesTable extends Component {
   columns = [
       { path:"title",label:"Title" },
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
            <table className="table">
                <TableHeader 
                    columns={this.columns} 
                    sortColumn={sortColumn} 
                    onSort={onSort}
                />
                <TableBody
                    data = {movies}
                    columns = {this.columns}
                />
            </table>
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