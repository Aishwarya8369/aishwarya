import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'


const App = () => {
  const[showLogin, setShowLogin] = useState(false)
  return (

     
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Navbar setShowLogin = {setShowLogin}/>
    <Routes>
    <Route path='/' element = {<Home/>}/>
        <Route path='/collection' element = {<Collection/>}   />
        <Route path='/about' element = {<About/>} /> 
        <Route path='/contact' element = {<Contact/>} />
        <Route path='/cart' element = {<Cart/>} /> 
   </Routes>
    </div>
    

    
    
  )
}

export default App