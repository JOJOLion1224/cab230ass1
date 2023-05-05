import React, { useState, useEffect } from 'react';
import useMovies from "./api";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Movies() {
    const { movies, isLoading, error } = useMovies();

    const columns = [
        { headerName: 'Title', field: 'title', sortable: true, filter: true},
        { headerName: 'Year', field: 'year', sortable: true, filter: "agNumberColumnFilter"},
        { headerName: 'IMDB Rating', field: 'imdbrating', sortable: true, filter: "agNumberColumnFilter"},
        { headerName: 'RottenTomatoes', field: 'rottentomatoes', sortable: true, filter: "agNumberColumnFilter"},
        { headerName: 'Metacritic', field: 'metacritic', sortable: true, filter: "agNumberColumnFilter"},
        { headerName: 'Rated', field: 'rated', sortable: true, filter: true}
    ]

    if (isLoading) {
        return <p>Loading movies... ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
//style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
    return (
        <div className='container' >
            <p>Movies containing the text</p> 
            <input 
                name="searchbytitle"
                id="searchbytitle"
                type="search"
            />
            <p>from</p>
            <select>
                
            </select>
            <div className="ag-theme-alpine"  style={{ height: '80vh', width: '65vw'}}>
                <AgGridReact
                    columnDefs={columns} 
                    rowData={movies}
                    pagination={true}
                    paginationPageSize={15}
                />
            </div>
        </div>
    )
};

export default Movies;