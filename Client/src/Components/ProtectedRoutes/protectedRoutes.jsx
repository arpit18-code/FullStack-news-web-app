import { FirebaseContext } from '../../Context/Firebase'
import {useContext} from 'react'
import { Navigate } from "react-router-dom"
const ProtectedRoutes = ({children})=>{
  const {currentUser} = useContext(FirebaseContext)
  return currentUser ? children : <Navigate to="/signin"/>
}

export default ProtectedRoutes