import React, { useState } from 'react';
import useMovies from "./api";
import SearchBar from '../components/SearchBar';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Movies() {
    const [ search, setSearch ] = useState('')
    const [ selectedYear, setSelectedYear ] = useState('')
    const { movies, isLoading, error } = useMovies(search, selectedYear);

    const navigate = useNavigate();

    const columns = [
            { headerName: 'Title', field: 'title', sortable: true, filter: true},
            { headerName: 'Year', field: 'year', sortable: true, filter: "agNumberColumnFilter"},
            { headerName: 'IMDB Rating', field: 'imdbrating', sortable: true, filter: "agNumberColumnFilter"},
            { headerName: 'RottenTomatoes', field: 'rottentomatoes', sortable: true, filter: "agNumberColumnFilter"},
            { headerName: 'Metacritic', field: 'metacritic', sortable: true, filter: "agNumberColumnFilter"},
            { headerName: 'Rated', field: 'rated', sortable: true, filter: true},
            { headerName: 'IMDBID', field: 'imdbid', hide: true}
    ]

    function rowClick(row) {
        navigate(`/movies/data/${row.data.imdbid}`, {state: {data: row.data.imdbid}});
    }
    
    if (isLoading) {
        return <p>Loading movies... ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='Container' >
            <SearchBar onSearch={setSearch} onSelectYear={setSelectedYear}/>
            <div className="ag-theme-alpine" style={{ height: '80vh', width: '65vw'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={movies}
                    pagination={true}
                    paginationPageSize={15}
                    onRowClicked={(row) => rowClick(row)}
                />
            </div>
    </div>
    )
};

export default Movies;