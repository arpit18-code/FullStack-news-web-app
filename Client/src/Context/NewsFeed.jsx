import { createContext, useState, useEffect,useContext } from "react";
import { SearchContext } from "./SearchContext";
import { fetchNewsCategory } from "../services/fetchNewsCategory";
export const NewsFeed = createContext()

export const NewsFeedContextProvider = ({children})=>{

    let [NewsArray, setNewsArray] = useState([])
    let [category,setCategory] = useState('All')
    let {setCategoryPage} = useContext(SearchContext)

    useEffect(()=>{
        const loadNews = async()=>{
            try {
                let data = await fetchNewsCategory(category)
                setNewsArray(data.results)
                setCategoryPage(data.nextPage)
            } catch (error) {
                console.error("Error fethcing in news")
            }
        }
        loadNews()
    },[category])
    
    
    return(
        <NewsFeed.Provider value={{
            NewsArray,
            setNewsArray,
            category,
            setCategory,
            }}>
       {children}
        </NewsFeed.Provider>
    )
}

