import Home from './Pages/home'
import SignIn from './Pages/signIn'
import CommentPage from './Pages/commentPage'
import BookmarksPage from './Pages/bookmarks'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import { NewsFeedContextProvider } from './Context/NewsFeed'
import { BookmarksContextProvider } from './Context/bookmarksContext'
import {FirebaseProvider} from './Context/Firebase'
import ProtectedRoutes from './Components/ProtectedRoutes/protectedRoutes'
import { SearchContextProvider } from './Context/SearchContext'

function App() {
  
  return (
    <>
    <FirebaseProvider>
      <SearchContextProvider>
    <NewsFeedContextProvider>
      <BookmarksContextProvider>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/commentPage" element={
        <ProtectedRoutes>
            <CommentPage/>
        </ProtectedRoutes>
        }/>
      <Route path="/bookmarks" element={<BookmarksPage/>}/>
     </Routes>
     </BookmarksContextProvider>
    </NewsFeedContextProvider>
    </SearchContextProvider>
     </FirebaseProvider>
     
      
    </>
  )
}

export default App
