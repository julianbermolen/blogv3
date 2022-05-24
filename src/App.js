import React from 'react';
import './App.css';
import Navegador from './components/Navbar';
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import About from './pages/about.js';
import Blog from './pages/blog.js';
import Post from './pages/post.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Navegador/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path="/post/:id" element={<Post />}/>
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
