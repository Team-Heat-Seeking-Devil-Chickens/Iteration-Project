import React from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../Styles/LoginStyles.css';

export default function SignUp({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setzipCode] = useState('');
  // const navigate = useNavigate();

  const handleSignUp = () => {
    console.log('Type Username here', username);
    console.log('Type Password here', password);
    console.log('Type ZipCode here', zipCode);
    console.log('Button has been clicked to login');
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        zipcode,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data) => {
              localStorage.setItem('cookieSSID', data.cookieSSID);
              setLoggedIn(true);
              // return navigate('/');
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCreateAccount = () => {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        zipCode,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              localStorage.setItem('cookieSSID', data.cookieSSID);
              setLoggedIn(true);
              // return navigate('/');
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='login'>
      <h1 className='logTitle'>Team Chicken</h1>
      <div>
        <input
          className='username'
          type='username'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          className='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className='zipCode'
          type='zipCode'
          placeholder='zipCode'
          value={zipCode}
          onChange={(e) => setzipCode(e.target.value)}
        ></input>
        <div>
          <button onClick={handleSignUp}>Login</button>
          <button className='createAcct' onClick={handleCreateAccount}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
