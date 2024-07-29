import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Ensure this path is correct
import './Homepage.css';

function HomePage() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="HomePage">
            <header className="homepage-header">
                <div className="welcome-container">
                    <h1>Welcome
                        <br></br>
                         to 
                         the
                         <br></br>
                         Pokemon 
                         World!</h1>
                    <div className="button-container">
                        {!user && (
                            <>
                                <button onClick={handleLoginClick}>Login</button>
                                <button onClick={handleRegisterClick}>Register</button>
                            </>
                        )}
                    </div>
                </div>
               
            </header>
        </div>
    );
}

export default HomePage;
