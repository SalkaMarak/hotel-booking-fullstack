import React, { useState } from "react";
import { registerUser } from '../services/ServiceConfig'

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
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
            registerUser(formData).then((response) => {
                console.log(response);
              }).catch(error => {
                console.error(error);
              })
        }else{
            console.log("Every field is required")
        }
    };

    function validate() {
        if (formData.name === '' || formData.email === '' || formData.password === '' || formData.phoneNumber === '') {
            return false;
        } else {
            return true;
        }
    }
    

    return (
        <div className="registration">
            <div className="container">
                <h2 className="mb-4">User Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button><br/><br/>
                    <a href="/welcome">Go to Home</a>
                </form>
            </div>
        </div>
    );
}

export default Registration;
