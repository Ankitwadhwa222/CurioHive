import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
   const [ loading , setLoading ] = useState(true)
   const dispatch = useDispatch()

    useEffect( () => {
      authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        }
        else{
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
    } , [])

  return !loading ?  (
  //  <h1 className="text-3xl font-bold underline">
  //   Hello world!
  // </h1>
  <>
  <Header />
  <Outlet/>
  <Footer/>
  </>
   ) : null;
}

export default App


//implement catch after then