import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './admin.css';

const LoginAdmin = () => {
  const { setToken, setRole } = useContext(AdminContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  useEffect(() => {
  }, [data]);

  const onLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:4000/api/admin/login/ad', data);

    if (response.data.success) {
      setToken(response.data.token);// Set the token in the context
      setRole(response.data.role); // Set the role in the context
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role); // Store the role in sessionStorage
      toast.success("Successfully logged in");
      navigate('/list');
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className='login-popup-overlay-admin'>
    <div className='login-popup-admin'>
      <form onSubmit={onLogin} className="login-popup-container-admin">
        <div className="login-popup-title-admin">
          <h2>Login</h2>
          {/* You can add a close button here if needed */}
        </div>
        <div className="login-popup-inputs-admin">
          <input type="text" name='username' onChange={onChangeHandler} value={data.username} placeholder='Your name' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
        </div>
        <button type='submit'>Login</button>
        <div className="login-popup-condition-admin">
         
        </div>
      </form>
    </div>
  </div>
  );
};

export default LoginAdmin;
