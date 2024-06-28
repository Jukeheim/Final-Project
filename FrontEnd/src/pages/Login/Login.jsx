import { useContext, useState } from "react";
import { loginService } from "../../services/UserService";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
    const { login, user: currentUser } = useContext(AuthContext)
    const [ user, setUser ] = useState({
        email: "",
        password: "",
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        loginService(user)
            .then(token => {
                login(token)
            })
            .catch(err => {
                console.log(err)
            })
    }

    if(currentUser) {
        return <Navigate to ="/" />
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name="email" onChange={handleInputChange} value={user.email} type="email" className="form-control" id="email" required placeholder="Add a email..." />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name="password" onChange={handleInputChange} value={user.password} type="password" className="form-control" id="password" required placeholder="Add a password..." />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login
