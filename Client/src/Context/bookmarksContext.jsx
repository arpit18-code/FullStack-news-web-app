import { createContext,useState } from "react";

export const Bookmarks = createContext()

export const BookmarksContextProvider = ({children})=>{
    let [BookmarksArray,setBookmarksArray] = useState([])
    
    let handleAddBookmark = (article)=>{
         setBookmarksArray((prev)=> [...prev,article])
    }

    let handleRemoveFromBookmark = (article)=>{
        let newArray = BookmarksArray.filter(articleInArray => article!=articleInArray)
        setBookmarksArray(newArray)
    }

    return(
        <>
    
        <Bookmarks.Provider value={{BookmarksArray,setBookmarksArray,handleRemoveFromBookmark,handleAddBookmark}}>
          {children}
        </Bookmarks.Provider>
        </>
    )
}

