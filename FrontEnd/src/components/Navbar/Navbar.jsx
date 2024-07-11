import  { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logout } from '../../stores/AccessTokenStore';
import './Navbar.css';

function Navbar() {
    const { user } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Pokemon</Link>
                <Link to="/pokedex" className="pokedex-link">Pokedex</Link>
            </div>
            {user && (
                <ul className="navbar-links">
                    <li><Link to="/events">Events</Link></li>
                    <li className="dropdown" onClick={toggleDropdown}>
                        <button className="dropdown-toggle">
                            {user.username}
                        </button>
                        {dropdownVisible && (
                            <ul className="dropdown-menu">
                               <Link className="dropdown-item" to="/profile">Profile</Link>
                                <button className="dropdown-item logout-button" onClick={logout}>Logout</button>
                            </ul>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
