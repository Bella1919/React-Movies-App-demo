import React from 'react';

const MovieForm = ({match,history}) => {
    return ( 
        <div>
            <h1>
                {/* Dynamic to show the movie's id we need to use router's match.params.id property */}
                MovieForm {match.params.id}
            </h1>
            <button 
                className="btn btn-primary"
                // history.push is a property of router, it can dump to anyone URL which you want to go.
                onClick={()=>history.push('/movies')}
            >
                Save
            </button>
        </div>
     );
}
 
export default MovieForm;