import { createContext,useState, useEffect } from "react";
import {getAuth,GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../Firebase/setup";


export const FirebaseContext = createContext(null)

export const FirebaseProvider = ({children})=>{

    let auth = getAuth(firebaseApp)
    let googleProvider = new GoogleAuthProvider()
    const db = getFirestore(firebaseApp);
    const [currentUser,setCurrentUser] = useState(null)

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    });

    return () => unsubscribe();
  }, [auth]);

    return(
        <FirebaseContext.Provider value={{auth,googleProvider,currentUser,setCurrentUser,db}}>
            {children}
        </FirebaseContext.Provider>
    )
}