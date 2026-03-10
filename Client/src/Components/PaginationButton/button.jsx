import { FaArrowDown } from "react-icons/fa";
import {useContext} from 'react'
import { NewsFeed } from "../../Context/NewsFeed";
import { SearchContext } from "../../Context/SearchContext";
import {fetchNewsCategory} from "../../services/fetchNewsCategory";
import { fetchNewsGlobal } from "../../services/fetchNewsGlobal";

export const PaginationButton = ()=>{
    let {categoryPage,setCategoryPage,searchType,setSearchType,setSearchResultsPage,searchResultsPage} = useContext(SearchContext)
    let {setNewsArray,category} = useContext(NewsFeed)
    let handlePagination = ()=>{
        if(searchType === 'All' || searchType === 'business' || searchType === 'entertainment' || searchType === 'health' || searchType === 'politics' || searchType === 'sports' || searchType === 'top'){
            fetchNewsCategory(category,categoryPage).then((data)=>{
                setNewsArray((prev)=> [...prev,...data.results])
                setCategoryPage(data.nextPage)
            })
        }else{
            fetchNewsGlobal(searchType,searchResultsPage).then((data)=>{
                setNewsArray((prev)=> [...prev,...data.results])
                setSearchResultsPage(data.nextPage)
            })
        }
    }
    return(
        
        <div className="flex justify-center bg-gray-800 p-5">
            <button onClick={handlePagination} className="bg-white p-3 rounded hover:bg-gray-200 hover:cursor-pointer active:scale-95" title="Load more news articles">
                <FaArrowDown className="h-8 w-8"/>
            </button>
        </div>
        
    )
}