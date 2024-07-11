import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { createUser } from "../../services/UserService";

const Register = () => {
    const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        profilePicture: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        createUser(user)
            .then(() => {
                navigate('/login');
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (!isAuthLoaded) {
        return <p>Loading...</p>;
    }

    if (currentUser) {
        return <Navigate to="/profile" />;
    }

    return (
        <div>
            <h1 className="mb-3">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        onChange={handleInputChange}
                        value={user.email}
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        required
                        placeholder="Add an email..."
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        onChange={handleInputChange}
                        value={user.password}
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        required
                        placeholder="Add a password..."
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        onChange={handleInputChange}
                        value={user.username}
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        required
                        placeholder="Add a username..."
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                    <input
                        onChange={handleInputChange}
                        value={user.profilePicture}
                        type="text"
                        className="form-control"
                        name="profilePicture"
                        id="profilePicture"
                        placeholder="Add a profile picture URL..."
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
