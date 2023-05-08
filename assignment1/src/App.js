import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';

import { AuthProvider } from "./components/AuthenticationContext";
import Navigation from './components/Nav';
import Footer from "./components/Footer";

import Home from "./pages/home";
import Movies from "./pages/movies";
import Movie from "./pages/movie";
import Register from "./pages/register";
import Login from "./pages/login";
import People from "./pages/person";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter> 
        <div className="App">
          <Navigation />
          <div className="MainContent">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/movies/data/:moviename" element={<Movie />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/people/:personid" element={<People />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>   
    </BrowserRouter>
    </AuthProvider>
                                    
  );
}

export default App;
