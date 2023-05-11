import React, { useState, useEffect } from "react";
import { Badge, ListGroup, ListGroupItem } from 'reactstrap'
import { useNavigate, useLocation } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function Movie() {
    const location = useLocation();
    const id = location.state.data;
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ movieInfo, setMovieInfo ] = useState([]);
    const [ staffInfo, setStaffInfo ] = useState([]);

    const genreColours = [ "primary", "secondary", "success", "danger", "warning", "info",  "light",  "dark"];

    useEffect (() => {
        fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${id}`)    
        .then((res) => res.json())
        .then(movie => {
            setMovieInfo(movie);
            setStaffInfo(movie.principals);
        })
        .catch(error => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [id])

    if (isLoading) {
        return <p>Loading information... ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const altText = "Movie poster for " + movieInfo.title;

    function divideNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const columns = [
        { headerName: 'Role', field: 'category', sortable: true, filter: true},
        { headerName: 'Name', field: 'name', sortable: true, filter: true},
        { headerName: 'Characters', field: 'characters', sortable: true, filter: true},
        { headerName: 'ID', field: 'personid', hide:true }
    ];

    function rowClick(row) {
        navigate(`/people/${row.data.id}`, {state: {data: row.data.id}});
    }

    const randomColour=()=> {
        const randomIndex = Math.floor(Math.random() * genreColours.length);
        return genreColours[randomIndex];
    }

    return (
        <div className="container">
            <div 
                className="informationContainer"
                style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'center'}}
            >
                <div className="information">
                    <h3>{movieInfo.title}</h3>
                    <ListGroup>
                        <ListGroupItem>
                            Released in: {movieInfo.year}
                        </ListGroupItem>
                        <ListGroupItem>
                            Runtime: {movieInfo.runtime}
                        </ListGroupItem>
                        <ListGroupItem>
                            Genres: 
                            {movieInfo.genres.map(
                                (genre)=> 
                                <Badge key={genre} style={{ marginLeft: '1vw' }} color={randomColour()} pill>
                                    {genre}
                                </Badge>)}
                        </ListGroupItem>
                        <ListGroupItem>
                            Country: {movieInfo.country}
                        </ListGroupItem>
                        <ListGroupItem>
                            Box Office: ${divideNumber(movieInfo.boxoffice)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <i>
                                {movieInfo.plot}
                            </i>
                        </ListGroupItem>
                    </ListGroup>
                </div>

                <div style={{ marginLeft: '3vw' }}>
                    <img 
                        style={{height: '300px', width: 'auto'}} 
                        src={movieInfo.poster} alt={altText}
                    />
                </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div className="ag-theme-alpine" style={{ height: '50vh', width: '32vw'}}>
                    <AgGridReact 
                        columnDefs={columns}
                        rowData={staffInfo}
                        pagination={true}
                        paginationPageSize={15}
                        resizable={true}
                        onRowClicked={(row) => rowClick(row)}
                    />              
                </div>
                <div style={{ marginLeft: '3vw' }}>
                    <ListGroup>
                        <ListGroupItem className="justify-content-between">
                                Internet Movie Database{' '}
                            <Badge color="info" pill>
                                {movieInfo.ratings[0].value + '/10'}
                            </Badge>
                        </ListGroupItem>
                        <ListGroupItem className="justify-content-between">
                                Rotten Tomatoes{' '}
                            <Badge color="info" pill>
                                {movieInfo.ratings[1].value + '%'}
                            </Badge>
                        </ListGroupItem>
                        <ListGroupItem className="justify-content-between">
                                Metacritic{' '}
                            <Badge color="info" pill>
                                {movieInfo.ratings[2].value + '%'}
                            </Badge>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}