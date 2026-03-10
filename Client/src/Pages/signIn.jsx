import SignUp from '../assets/SignUP_image_2.png'
import { MdHome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Components/Footer/footer';
import { signInWithPopup } from "firebase/auth";
import { FirebaseContext } from '../Context/Firebase';
import { useContext,useEffect } from 'react';

const SignIn = ()=>{
    let navigate = useNavigate()
    let handleNavigateToHome = ()=>{
        navigate('/')
    }
    let {auth,googleProvider} = useContext(FirebaseContext) 


    let handleSignIn = async()=>{
        try {
            await signInWithPopup(auth,googleProvider)
            auth.currentUser && navigate('/')
        } catch (error) {
            console.log("Error occured !")
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

    return(
        <>     
        <div className="bg-gray-950 min-h-screen">
        <div className="bg-gray-700 h-fit text-white flex justify-between p-2">
            
            <MdHome className="text-5xl text-white self-start  cursor-pointer hover:text-blue-600 block" onClick={handleNavigateToHome} title="Back to Home"/>

        </div>

        <div className="bg-gray-950 h-full text-white flex flex-col lg:flex-row justify-center items-center select-none my-2">
           
           <div className="border-2 border-white rounded-2xl w-70 h-70 sm:w-80 sm:h-80 mx-auto lg:mx-5 flex justify-center items-center lg:my-2">
            
            <div>
            <h2 className="text-center font-extrabold font-serif text-4xl my-2">Rapid News</h2>
            <h2 className="text-center font-extrabold text-4xl">Sign In</h2>
            <button onClick={handleSignIn} className="bg-blue-600 hover:bg-blue-700 text-center mx-auto block my-3 w-50 h-13 rounded-3xl cursor-pointer shadow-white shadow-1x2">Sign up</button>
            
           </div>
             
           </div>

           <div>
            <marquee behavior="scroll" direction="left" className="w-70 sm:w-80 mx-auto lg:mx-5 mt-4 lg:my-auto">Deliever News on Politics, Health, Sports, Business and many more --</marquee>
            <img src={SignUp} alt="image" className=" h-70  w-70 sm:h-80 sm:w-80 mx-auto lg:mx-5  lg:my-auto"/>
           </div>
           
        </div>

        <Footer/>
        </div>
        </>
    )
}

export default SignIn