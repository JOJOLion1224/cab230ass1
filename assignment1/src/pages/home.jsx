import React from "react";
import { Link } from "react-router-dom";
import decoImage from "./homeImg.jpg"

function Home() {
    return (
        <main>
            <h1>Johnny Yang's Movie Collection.</h1>
            <h2>Welcome, Welcome.</h2>
            <img src={decoImage} alt="home page decorative" className="decoImage" style={{ width: "55vw", height: "35vw"}} />
        </main>
    )
}

export default Home;