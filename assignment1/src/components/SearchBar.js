import React, { useState, useEffect } from 'react';
import useMovies from '../pages/api';

function SearchBar(props) {
    const [innerSelectedYear, setInnerSelectedYear] = useState('');
    const [innerSearch, setInnerSearch] = useState("");

    function handleEnter(event) {
        if (event.key === 'Enter') {
            props.onSearch(innerSearch);
            props.onSelectYear(innerSelectedYear);
        }
    }

    return (
        <div>
            Enter the movie you want to search
            <input
                id='text'
                name='text'
                type="text"
                placeholder="Search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                onKeyDown={handleEnter}
            />
            in
            <select
                value={innerSelectedYear}
                onChange={(e) => setInnerSelectedYear(e.target.value)}
            >
                <option value="">Any Year</option>
                {[...Array(124).keys()].map((_, index) => {
                    const year = 1900 + index;
                    return (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    );
                })}
            </select>
        </div>
    )
}
 
export default SearchBar;