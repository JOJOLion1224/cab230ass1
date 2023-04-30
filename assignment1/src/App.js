import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Nav from './components/Nav';
import Footer from "./components/Footer";

import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies"></Route>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
        </Routes>

        <Footer/>
      </div>   
  </BrowserRouter>                                
  );
}

export default App;
