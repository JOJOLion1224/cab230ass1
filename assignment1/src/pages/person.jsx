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
        const url = `http://sefdb02.qut.edu.au:3000/people/${id}`;
      
        const fetchData = async () => {
          try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
              },
            });
      
            const data = await response.json();

            if (response.status === 401) {
                setMesssage("You need to log in to access staff information.")
                toggleAlert();
                setAlertColour("warning")
            } else if (response.status === 404) {
                setMesssage("No record exists of a person with this ID")
                toggleAlert();
                setAlertColour("warning")
            }

            setPersonInfo(data);
            setRatings(data.roles.map((movie) => {
                return movie.imdbRating;
            }))
      
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchData();
      }, [bearerToken, id]);
      

    if (isLoading) {
        return <p>Loading movies... ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    console.log(ratings);

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