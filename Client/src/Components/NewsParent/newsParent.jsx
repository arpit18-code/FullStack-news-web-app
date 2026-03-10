import bgImage from '../../assets/Home_newspaper_2.jpg'
import { NewsFeed } from '../../Context/NewsFeed'
import { useContext } from 'react'
import { FaRegCommentDots, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Bookmarks } from '../../Context/bookmarksContext';
import { FirebaseContext } from '../../Context/Firebase';



const NewsParent = ()=>{
    let {NewsArray} = useContext(NewsFeed)
    let {handleAddBookmark,BookmarksArray,handleRemoveFromBookmark} = useContext(Bookmarks)
    let navigate = useNavigate()
    let {currentUser} = useContext(FirebaseContext)
    
    return(
        <>
        <div className="flex flex-wrap justify-evenly bg-repeat bg-auto h-auto w-full relative p-6" style={{backgroundImage:`url(${bgImage})`}}>
                    
          <div className="absolute inset-0 bg-black/50"></div>
        
          {
            NewsArray.length > 0 && NewsArray?.map((article)=>{
                let IsArticleInBookmark = BookmarksArray.find(bookMark => article === bookMark) ? true : false
                // let date = new Date(article.publishedAt)
                let date = new Date(article.pubDate)
                return(
                    <>
                    <div key={article.article_id} className="relative z-10 h-auto p-4 bg-white text-black border-2 border-black w-90 sm:w-80 lg:w-90 drop-shadow-md flex flex-col gap-3 my-4 hover:bg-white/90 rounded">
                        <h3 className="text-center text-black font-semibold text-2xl">{article.title}</h3>
                        {/* <img src={article.urlToImage} alt="article-image"/> */}
                        <img src={article.image_url} alt="article-image"/>
                        {/* <p className="text-right wrap-break-word">By - {article.author ? article.author : 'unknown author'}</p> */}
                        <p className="text-right wrap-break-word">By - {article.creator ? article.creator : 'unknown author'}</p>
                        <p className="text-right wrap-break-word">Published on - {date.toString().substring(0,15)}</p>
                        <p className="font-semi-bold">{article.description ? article.description : 'Description is not available right now'}</p>
                        {/* <p>{article.content ? article.content : 'This content is not available right now !'}</p> */}
                        <a href={article.link} className="text-blue-500 hover:underline" target="_blank">Read full article</a>
                        <div className="flex justify-between">
                            <FaRegCommentDots onClick={()=> navigate('/commentPage',{state:{article}})} className="h-8 w-8 inline-block hover:cursor-pointer" title="Go to comment section"/>
                                
                            {    
                                IsArticleInBookmark ? <FaBookmark onClick={currentUser ? ()=> handleRemoveFromBookmark(article) : ()=> navigate('/signin')} className="h-8 w-8 inline-block hover:cursor-pointer" title="Remove this article from your bookmark"/> : <FaRegBookmark onClick={currentUser ? ()=> handleAddBookmark(article) : ()=> navigate('/signin')} className="h-8 w-8 inline-block hover:cursor-pointer" title="Save this article in your bookmark"/> 
                            }
                        </div>

                        
                    </div>
                    </>
                )
            }) 
          }

          

          </div>
        </>
    )
}

export default NewsParent