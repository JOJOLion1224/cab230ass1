import React, { useState, useEffect } from "react";
import Notification from "../components/Notification";
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Button } from "reactstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.css';

function People() {
    const location = useLocation();
    const id = location.state.data;
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ personInfo, setPersonInfo] = useState([]);
    const bearerToken = localStorage.getItem("bearerToken");
    const [ ratings, setRatings ] = useState([]);
    const [ message, setMesssage ] = useState("");
    const [ visible, setVisible ] = useState(false);
    const [ alertColour, setAlertColour ] = useState("");

    const columns = [
        { headerName: 'Role', field: 'category', sortable: true, filter: true},
        { headerName: 'Movie', field: 'movieName', sortable: true, filter: true},
        { headerName: 'IMDB Rating', field: 'imdbRating', sortable: true, filter: true},
        { headerName: 'Character/s', field: 'characters', sortable: true, filter: true}
    ];

    function toggleAlert () {
        setVisible(true);
    };

    async function handleToken(message) {
      const bearerToken = localStorage.getItem("bearerToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!bearerToken && message === "Invalid JWT token") {
        setMesssage("You need to login to access individual person's information")
      } else if (bearerToken && message === "JWT token has expired") {
          try {
            const response = await fetch('http://sefdb02.qut.edu.au:3000/user/refresh', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
          });

          if (response.ok) {
            const data = response.json();
            localStorage.setItem("bearerToken", data.bearerToken.token);
            localStorage.setItem("refreshToken", data.refreshToken.token);
          } else {
            setMesssage("Your session has expired, you need to re-login.")
            //throw new Error(`Error refreshing access token: ${response.status}`);
          } 
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }}
    }

    const labels = Array.from({ length: ratings.length }, (_, i) => 1 + i);

    const chartData = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: ratings,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };

      useEffect(() => {
        fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
        })
        .then(async (response) => {
          const data = await response.json(); 

          if (response.status !== 200) {
              toggleAlert()
              setAlertColour("warning")
              handleToken(data.message)
          } 
          return data;
        })
        .then((data) => {
          
          setPersonInfo(data);
          setRatings(data.roles.map((movie) => {
            return movie.imdbRating;
          }))
          
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })  
    }, [bearerToken, id, alertColour, message, navigate, visible]);

    if (isLoading) {
      return <p>Loading movies... ...</p>;
    }

    if (error) {
      return (
        <Notification 
            message={message}
            visible={visible}
            alertColour={alertColour}
        />
      )
    }

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
    );
    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: `${personInfo.name}'s performance at a galance`,
            },
        },
    };

    return (
        <div className="Container">
            <div className="Notifications">
                <Notification 
                    message={message}
                    visible={visible}
                    alertColour={alertColour}
                />
                <Button style={{display: visible ? 'block' : 'none' }} onClick={() => navigate(`/login`)}>
                    Login
                </Button>
            </div>
            
            <div>
                <h2>{personInfo.name}</h2>
                <b>{personInfo.birthYear} - {personInfo.deathYear}</b>
            </div>
            <div className="ag-theme-alpine" style={{ height: '50vh', width: '65vw'}}>
                <AgGridReact 
                    columnDefs={columns}
                    rowData={personInfo.roles}
                    pagination={true}
                    paginationPageSize={15}
                />              
            </div>
            <div className="">
                <Line options={options} data={chartData} />
            </div>
        </div>
    )
}

export default People;