import { Link } from 'react-router-dom';
import { useAuth } from '../helpers/AuthenticationContext';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Navigation() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();   
    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const email = localStorage.getItem("email");

    function handleLogout() {
        const refreshToken = localStorage.getItem("refreshToken");
        
        setIsLoggedIn(false);

        try {
            fetch(`http://sefdb02.qut.edu.au:3000/user/logout`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            })
        } catch (error) {
            console.log(error)
        }
        localStorage.removeItem('bearerToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
    }

    return (
        <div className="Nav" style={{width: '100%', marginBottom: '2vh'}}>
            <Navbar color="dark" dark expand="md" >
                <NavbarBrand >Johnny Yang</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar horizontal='center'>
                        <NavItem>
                            <NavLink className="NavLink" tag={Link} to="/"> 
                                Home 
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="NavLink" tag={Link} to="/movies"> 
                                Movies 
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {
                                isLoggedIn ? 
                                (<NavLink 
                                    className="NavLink" 
                                    tag={Link} to="/login" 
                                    onClick={handleLogout}> 
                                    Logout:  {email} 
                                </NavLink> ) 
                                    : 
                                (<NavLink 
                                    className="NavLink" 
                                    tag={Link} 
                                    to="/login"> 
                                    Login 
                                </NavLink>)
                            }
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                className="NavLink" 
                                tag={Link} 
                                to="/register"> 
                                Register 
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation;