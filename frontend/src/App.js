import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateBooks from './components/CreateBooks';
import DeleteBooks from './components/DeleteBooks';
import EditBooks from './components/EditBooks';
import Home from './components/Home';
import ShowBooks from './components/ShowBooks';
import './index.css'


function App() {
  return (
    <div className=''>
       <Routes>  
        <Route path='/' element={<Home />}/>
        <Route path='/books/create' element={<CreateBooks />}/>
        <Route path='/books/edit/:id' element={<EditBooks />}/>
        <Route path='/books/details/:id' element={<ShowBooks />}/>
        <Route path='books/delete/:id' element={<DeleteBooks />}/>
       </Routes>
    </div>
  );
}

export default App;
