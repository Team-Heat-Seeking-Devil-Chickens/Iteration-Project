import React, { useState } from 'react';
import '../styles/main.scss';
import { useDispatch } from 'react-redux';
import ReviewContainer from '../containers/ReviewContainer.jsx';
import RestaurantDisplay from '../containers/RestaurantDisplay.jsx';

{
  /* <h1>This is a header</h1>
<h2>This is a secondary header</h2>
<h3>This is a tertiary header</h3> */
}

const App = () => {
  return (
    <div id='app'>
      <h1>Nathan Peel's Cool Site</h1>
      <RestaurantDisplay />
      <ReviewContainer />
    </div>
  );
};

export default App;
