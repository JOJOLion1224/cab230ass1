import { Link } from 'react-router-dom';
import "./Nav.css";
import { useAuth } from './AuthenticationContext';

function Navigation() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();    

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
    }

    return (
        <div className="Nav">
            <ul className="NavList">
                <li>
                    <Link className="NavLink" to="/"> Home </Link>
                </li>
                <li>
                    <Link className="NavLink" to="/movies"> Movies </Link>
                </li>
                {
                    isLoggedIn ? (
                        <li>
                            <Link className="NavLink" to="/login" onClick={handleLogout}> Logout </Link>
                        </li> ) : (
                        <li>
                            <Link className="NavLink" to="/login"> Login </Link>
                        </li>
                    )
                }
                <li>
                    <Link className="NavLink" to="/register"> Register </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;