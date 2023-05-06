import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Navigation from './components/Nav';
import Footer from "./components/Footer";

import Home from "./pages/home";
import Movies from "./pages/movies";
import Movie from "./pages/movieDetails";

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Navigation />
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/movies/data/:moviename" element={<Movie />}></Route>
            <Route path="/login"></Route>
            <Route path="/register"></Route>
          </Routes>
        </div>
        <Footer />
      </div>   
  </BrowserRouter>                                
  );
}

export default App;
