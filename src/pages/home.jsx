import React from "react";
import decoImage from "../img/homeImg.jpg";

function Home() {
    return (
        <div>
            <div 
                style={{ 
                    backgroundImage: `url(${decoImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '90vh',
                    filter: "blur(2px)"
                }}
            >
            </div>
            <div 
                style={{
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                }}
            >
                <h1  style={{color: "white", fontWeight: "bold"}}>
                    Welcome to Johnny Yang's Movie Collection.
                </h1>
            </div>
        </div>
        
        
    )
}

export default Home;