import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Heading = ()=>{
    let navigate = useNavigate()
    return(
        <>
        <div className="bg-gray-700 text-white p-3 w-full">
            <h2 className="text-white font-extrabold font-serif text-4xl text-center">Welcome to Rapid News</h2>
            <p className="text-center font-serif">Indian News</p>
            <p className="text-right font-serif">
                <span onClick={()=> navigate('/bookmarks')} className="p-2 m-2 inline-block rounded-2xl hover:text-blue-500 cursor-pointer">
                <span>Bookmarks</span>
                <FaRegBookmark className="h-8 w-8 hover:cursor-pointer text-right inline-block"/>
                </span>
            </p>
              
        </div>
        </>
    )
}

