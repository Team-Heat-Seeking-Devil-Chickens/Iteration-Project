import React, { useState } from 'react';
import '../styles/main.scss';
import { useDispatch } from 'react-redux';
import ReviewContainer from '../containers/ReviewContainer.jsx';
import RestaurantDisplay from '../containers/RestaurantDisplay.jsx';
import RestaurantQuery from '../containers/RestaurantQuery.jsx';
import Signup from '../components/App.jsx';

{
  /* <h1>This is a header</h1>
<h2>This is a secondary header</h2>
<h3>This is a tertiary header</h3> */
}

const App = (props) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieToken = localStorage.getItem('cookieSSID');
    cookieToken ? fetchUserData(cookieToken) : setLoading(false);
    setLoggedIn(false);
  }, [loggedIn]);

  const fetchUserData = async () => {
    const user = await fetch('/secrets/user', {
      headers: {
        Authorization: `Bearer ${cookieSSID}`,
      },
    });

    if (user.ok) {
      const userData = await user.json();
      setUser(userData);
    } else {
      //
      setUser({});
    }

    setLoading(false);
  };

  if (loading) return null;

  return (
    <div id='app'>
      {/* <NavBar
        display={
          user.username ? (
            <RestaurantDisplay user={user} setUser={setUser} />
          ) : (
            <SignUp setLoggedIn={setLoggedIn} />
          )
        }
      /> */}
      <h1>(rec(commend), res(taurants), next)</h1>
      {/* {user.username ? (
        <RestaurantDisplay user={user} setUser={setUser} />
      ) : (
        <SignUp setLoggedIn={setLoggedIn} />
      )} */}
      <RestaurantQuery />
      <RestaurantDisplay />
      <ReviewContainer />
    </div>
  );
};

export default App;
