import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateProducts from './components/CreateProducts';
import EditProducts from './components/EditProducts';
import Home from './components/Home';
import ShowProducts from './components/ShowProducts';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './index.css';


function App() {
  return (
    <div className=''>
       <Routes>  
       <Route path='/' element={<Signup />}/>
       <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/products/create' element={<CreateProducts />}/>
        <Route path='/products/edit/:id' element={<EditProducts />}/>
        <Route path='/products/details/:id' element={<ShowProducts />}/>
       </Routes>
    </div>
  );
}

export default App;
