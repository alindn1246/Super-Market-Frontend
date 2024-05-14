import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:7211/api/auth/login', {
        username: username,
        password: password
      });

      const { isSuccess, result } = response.data;

      if (isSuccess && result.user.roles.includes('CUSTOMER')) {
        console.log(result.user)
        localStorage.setItem('user',JSON.stringify(result.user))
        localStorage.setItem('token', result.token); 
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        navigate('/');
       
      }
     if (isSuccess && result.user.roles.includes('ADMIN')) {
      localStorage.setItem('user',JSON.stringify(result.user))
      localStorage.setItem('token', result.token); 
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);
      navigate('/Admin');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };



  return (
    <div className="container border p-4">
      <div className="row text-center">
        <h1>Login</h1>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 pb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 offset-md-3 pb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 offset-md-3 pb-2  justify-content-center">
          <button
            type="submit"
            className="form-control btn btn-success"
            onClick={handleSubmit}
          >
            Login
          </button>
          <span>I dont have an account <Link to={"/Register"}> Register</Link></span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
