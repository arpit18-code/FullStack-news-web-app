import { createContext,useState } from "react";

export const SearchContext = createContext()

export const SearchContextProvider = ({children})=>{
    
    let [searchType,setSearchType] = useState('All')
    let [categoryPage,setCategoryPage] = useState(1)
    let [searchResultsPage,setSearchResultsPage] = useState(1)
    return(
        <SearchContext.Provider value={{searchType,setSearchType,setCategoryPage,setSearchResultsPage,categoryPage,searchResultsPage}}>
            {children}
        </SearchContext.Provider>
    )
}