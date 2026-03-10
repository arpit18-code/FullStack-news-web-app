
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {useState, useContext} from 'react'
import { NewsFeed } from "../../Context/NewsFeed";
import { fetchNewsGlobal } from "../../services/fetchNewsGlobal";
import { FirebaseContext } from "../../Context/Firebase";
import { signOut } from "firebase/auth";
import { SearchContext } from "../../Context/SearchContext";
import { Bookmarks } from "../../Context/bookmarksContext";


export const Navbar = ()=>{
    let [search,setSearch] = useState('')
    const navigate = useNavigate()
    let {
        setCategory,
        setNewsArray,
        category
    } = useContext(NewsFeed)
    let {setBookmarksArray} = useContext(Bookmarks)
    let {auth,currentUser,setCurrentUser} = useContext(FirebaseContext)
    let {setSearchType,setSearchResultsPage} = useContext(SearchContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    let handleNavigationToSignIn = ()=>{
        navigate("/signin")
    }
    let handleSignOut = async()=>{
        try {
            await signOut(auth)
            setCurrentUser(null)
            setBookmarksArray([])
    
        } catch (error) {
            console.log(error)
        }
    }
    let handleSearchNews = async(search,setSearch)=>{ 
           let value = search.toLowerCase()
           if(value === ''){
            alert("Please enter a search term")
           }else{
              let data = await fetchNewsGlobal(value)
           setNewsArray(data.results)
           setSearchType(`${value}`)
           setSearchResultsPage(data.nextPage)
           setSearch('')
           }
           
    }
    let handleSearchOnEnter = async(e)=>{
            if(e.key === "Enter"){
                try {
                    await handleSearchNews(search,setSearch)
                } catch (error) {
                    
                }
            }
        }
    let handleChangeCategory = (e)=>{
        setCategory(e.target.innerText)
        setSearchType(e.target.innerText)
    }
    
    return(
        <>
        <div className="bg-gray-800 text-white p-3 flex gap-3 w-full overflow-auto left-0 top-0 sticky select-none z-50">
            
            
            <div onClick={currentUser ? handleSignOut : handleNavigationToSignIn} className="hover:cursor-pointer hover:bg-slate-700 p-2 rounded border-b-4 border-gray-800 hover:border-blue-500 w-30" style={{display: currentUser ? 'flex-col':'flex'}}>
                {
                    currentUser ?<> <p className="text-center font-bold my-auto">{`Hello ${currentUser.displayName}`}</p> <p className="text-center">Log out</p> </>: <><FaUser className="h-8 w-8 my-auto sm:mx-auto mx-2"/>
                 <p className="text-center font-bold my-auto">Sign up</p>
                 </>
                }

                
                 
            </div>

             <div className="my-auto mx-auto">
                <ul className="flex gap-5 list-none mx-2 p-2 text-Lg font-semibold">
                 <li className="categories" onClick={(e)=> handleChangeCategory(e)}>All</li>
                <li className="categories" onClick={(e)=> handleChangeCategory(e)}>business</li>
                <li className="categories" onClick={(e)=> handleChangeCategory(e)}>entertainment</li>
            <li className="categories" onClick={(e)=> handleChangeCategory(e)}>politics</li>
                <li className="categories" onClick={(e)=> handleChangeCategory(e)}>health</li>
                <li className="categories active:border-blue-500" onClick={(e)=> handleChangeCategory(e)}>top</li>
                <li className="categories" onClick={(e)=> handleChangeCategory(e)}>sports</li>
                </ul>
            </div> 

            
           {/* <div className="my-auto mx-auto">
    <ul className="flex gap-5 list-none mx-2 p-2 text-Lg font-semibold">
        {["All", "business", "entertainment", "politics", "health", "top", "sports"].map(cat => (
            <li
                key={cat}
                className={`categories ${category === cat ? "border-b-4 border-blue-500" : ""}`}
                onClick={(e) => handleChangeCategory(e)}
            >
                {cat}
            </li>
        ))}
    </ul>
            </div>  */}


            

            
            <div className="flex h-10 my-auto">
                <FaSearch className="my-auto w-5 h-5 mx-2 hover:cursor-pointer active:scale-95" onClick={()=> handleSearchNews(search,setSearch)}></FaSearch>
                <input type="text" placeholder="Search Indian news" className="text-gray-300 border-2 border-white p-2 rounded" value={search} onChange={(e)=> setSearch(e.target.value)} onKeyUp={(e)=>handleSearchOnEnter(e,search,setSearch)}/>
            </div>
            

        </div>

        </>
    )
}