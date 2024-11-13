import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './pages/Search';
import Home from './pages/Home';
import Movie from './pages/Movie';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/profil" element={<div>Profile Page</div>} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
