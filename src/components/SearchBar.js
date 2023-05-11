import React, { useState } from 'react';
import {
    InputGroup,
    ButtonDropdown,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Input
  } from 'reactstrap';
import Notification from './Notification';
import 'bootstrap/dist/css/bootstrap.css';

function SearchBar(props) {
    const [ innerSelectedYear, setInnerSelectedYear ] = useState('');
    const [ innerSearch, setInnerSearch ] = useState("");
    const [ toggleDropDown, setToggleDropDown ] = useState(false);
    const [ visible, setVisible ] = useState(false);

    function handleEnter(event) {
        if (event.key === 'Enter') {
            props.onSearch(innerSearch);
            props.onSelectYear(innerSelectedYear);
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 1000);
        }
    }

    const toggle = () => setToggleDropDown ((prevState) => !prevState);

    return (
        <div style={{marginBottom: '2vh'}}>
            <Notification 
                message={"Loading..."}
                visible={visible}
                alertColour={"warning"}
            />
            <InputGroup>
                <Input
                    id='text'
                    name='text'
                    type="text"
                    placeholder="Enter the movie you want to search"
                    value={innerSearch}
                    onChange={(e) => setInnerSearch(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <ButtonDropdown
                    toggle={function noRefCheck(){}}
                >
                    <Dropdown isOpen={toggleDropDown} toggle={toggle}>
                        <DropdownToggle caret>
                            {innerSelectedYear || "Any Year"}
                        </DropdownToggle>
                        <DropdownMenu style={{ maxHeight: "200px", overflowY: "scroll" }}>
                            <DropdownItem onClick={() => setInnerSelectedYear("")}>
                            Any Year
                            </DropdownItem>
                            <DropdownItem divider />
                            {[...Array(124).keys()].map((_, index) => {
                            const year = 1900 + index;
                            return (
                                <DropdownItem
                                key={year}
                                onClick={() => setInnerSelectedYear(year)}
                                >
                                {year}
                                </DropdownItem>
                            );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </ButtonDropdown>
            </InputGroup>
        </div>
    )
}
 
export default SearchBar;