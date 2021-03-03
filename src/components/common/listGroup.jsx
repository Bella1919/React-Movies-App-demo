import React from 'react'

//selectedItem use to highlight the genre option and find out which genre is selected.
//Destructuring Arguments like below:
const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
    

    return ( 
        <ul className="list-group">
            {items.map(item=>
                <li 
                    onClick={()=>onItemSelect(item)} 
                    style={{cursor:"pointer"}}
                    //instead of use item._id to access the property, we use bracket item[valueProperty] to dynamic access the property.
                    key={item[valueProperty]}
                    className={ item === selectedItem ? "list-group-item active" : "list-group-item"}
                >
                    {item[textProperty]}
                </li>
            )}
        </ul>
     );
}
ListGroup.defaultProps = { 
    textProperty:"name",
    valueProperty:"_id"
}
 
export default ListGroup;