import React from "react";

function SignUp() {
    return (
        <div className="Main">
            <div className="form-content-right">
                <form className="form">
                    <h1>Get started with us today! Create your 
                    account by filling out the information below.
                    </h1>
                    {/* Username Input Field */}
                    <div className="form-inputs">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input 
                            id="username"
                            type="text" 
                            name="username" 
                            className="form-input" 
                            placeholder="Enter Username"
                        />
                    </div>
                    {/* Full Name Input Field */}
                    <div className="form-inputs">
                        <label htmlFor="fullname" className="form-label">
                            Full Name
                        </label>
                        <input 
                            id="fullname"
                            type="text" 
                            name="fullname" 
                            className="form-input" 
                            placeholder="Enter Full Name"
                        />
                    </div>
                    {/* Email Input Field */}
                    <div className="form-inputs">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="Enter Email"
                        />
                    </div>
                    {/* Password Input Field */}
                    <div className="form-inputs">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            name="password" 
                            className="form-input" 
                            placeholder="Enter Password"
                        />
                    </div>
                    {/* Confirm Password Input Field */}
                    <div className="form-inputs">
                        <label htmlFor="cfmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input 
                            id="cfmPassword"
                            type="password" 
                            name="cfmPassword" 
                            className="form-input" 
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button className="form-input-btm" type="submit">
                        Sign Up
                    </button>
                    <span className="form-input-login">
                        Already have an account? <a href="/login">Login</a>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
