import React, { useState } from 'react';
import '../styles/main.scss';
import { useDispatch } from 'react-redux';
import ReviewContainer from '../containers/ReviewContainer.jsx';
import RestaurantDisplay from '../containers/RestaurantDisplay.jsx';
import RestaurantQuery from '../containers/RestaurantQuery.jsx';
import Signup from './Signup.jsx';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

{
  /* <h1>This is a header</h1>
<h2>This is a secondary header</h2>
<h3>This is a tertiary header</h3> */
}

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   const cookieToken = localStorage.getItem('cookieSSID');
  //   console.log(cookieToken)
  //   cookieToken ? fetchUserData(cookieToken) : setLoading(false);
  //   setLoggedIn(false);
  // }, [loggedIn]);

  // const fetchUserData = async (cookieSSID) => {
  //   const user = await fetch('/restaurant', {
  //     headers: {
  //       Authorization: `Bearer ${cookieSSID}`,
  //     },
  //   });

  //   if (user.ok) {
  //     const userData = await user.json();
  //     setUser(userData);
  //   } else {
  //     //
  //     setUser({});
  //   }

  //   setLoading(false);
  // };

  // if (loading) return null;

  return (
    <div id='app'>
      <Router>
        <Routes>
          <Route
            index
            element={
              user.username ? (
                <RestaurantDisplay
                  user={user}
                  setUser={setUser}
                  username={username} // Pass the username state here
                  setUsername={setUsername} // Pass the setUsername function here
                />
              ) : (
                <Signup
                  setLoggedIn={setLoggedIn}
                  username={username}
                  setUsername={setUsername} // Pass the setUsername function here
                />
              )
            }
          />
          {/* Other routes go here */}
          <Route
            path='/restaurant'
            element={
              <RestaurantDisplay
                user={user}
                setUser={setUser}
                username={username} // Pass the username state here
                setUsername={setUsername} // Pass the setUsername function here
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
