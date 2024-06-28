
import Navbar from '../../components/Navbar/Navbar';
import './Homepage.css';

function HomePage() {
    return (
        <div className="HomePage">
            <Navbar/>
            <header className="homepage-header">
                <h1>Welcome to the Pokemon World!</h1>
                <div className="button-container">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
