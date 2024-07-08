import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try {
                //const response = await axios.post('/api/login', formData);
                //console.log('Login successful', response.data);
                // You can add logic here to handle successful login,
                // such as saving a token or redirecting the user.
                console.log("login successful")
            } catch (error) {
                console.error('There was an error logging in!', error);
            }
        } else{
            console.log("Every field is required")
        }
    };

    const validate = () => {
        if(formData.email === '' || formData.password === '') return false;
        else return true;
    }

    return (
        <div className="registration">
        <div className="container mt-5">
            <h2 className="mb-4">User Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <br/><br/><a href="/welcome">Go to Home</a>
            </form>
        </div>
        </div>
    );
};

export default Login;
