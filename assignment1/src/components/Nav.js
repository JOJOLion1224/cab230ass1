import { Link } from 'react-router-dom';
import "./Nav.css";

function Navigation() {
    return (
        <div className="Nav">
            <ul className="NavList">
                <li>
                    <Link className="NavLink" to="/"> Home </Link>
                </li>
                <li>
                    <Link className="NavLink" to="/movies"> Movies </Link>
                </li>
                <li>
                    <Link className="NavLink" to="/login"> Login </Link>
                </li>
                <li>
                    <Link className="NavLink" to="/register"> Register </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;