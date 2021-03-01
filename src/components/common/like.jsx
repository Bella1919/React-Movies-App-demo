import React from 'react'

//Input:likeed :boolean
//Output:onClick,nothing about the movies data

//Cause of this component dont have any  state ,help method or event handle, just have a render 
//method. So we can use Stateless function component.

const Like = (props) => {
    let classes = "fa fa-heart";
    if(!props.liked) classes +="-o";
    return (
        <i 
            onClick={props.onLikeToggle} 
            style={{cursor:"pointer"}}
            className={classes} 
            aria-hidden="true"
        >
        </i>
    )
}
 
export default Like;