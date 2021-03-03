import React from 'react';
//lodash can creat an array of numbers
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const { itemsCount, pageSize,currentPage, onPageChange } = props;
    // currenPage use to highlight the pagination
    const pagesCount = Math.ceil(itemsCount/pageSize);
    //Base on the pagesCount we need creat a array to the pages insaid like this:
    //[1,2.....pagesCount].map() , use lodash to get the array.
    if(pagesCount===1)return null;
    //We dont want to show the page number when it equal to 1.
    
    const pages = _.range(1,pagesCount +1 );
    // Cause the _.range dont includ the end numbers(pagesCount) itself, so we have to add +1.

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page=>(
                    <li key ={page} 
                        className={page===currentPage? "page-item active":"page-item"}>
                    <a className="page-link"
                        onClick={()=>onPageChange(page)}
                    >{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
        
    );
};
//Use propTypes to check the property type of  pagination
Pagination.propTypes = {
    itemsCount:PropTypes.number.isRequired, 
    pageSize:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired
};
 
export default Pagination;