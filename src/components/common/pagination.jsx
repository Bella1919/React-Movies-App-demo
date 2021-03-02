import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize,currentPage, onPageChange } = props;
    console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount/pageSize);
    //Base on the pagesCount we need creat a array to the pages insaid like this:
    //[1,2.....pagesCount].map() , use lodash to get the array.
    if(pagesCount===1)return null;
    //We dont want to show the page number when it equal to 1.
    const pages = _.range(1,pagesCount +1 );
    //cause the .range dont includ the end numbers(pagesCount) itself, so we have to add +1.

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
}
 
export default Pagination;