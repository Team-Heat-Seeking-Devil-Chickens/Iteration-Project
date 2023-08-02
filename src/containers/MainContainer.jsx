import React, { useState } from 'react';
import '../styles/main.scss';
import { useDispatch } from 'react-redux';
import ReviewContainer from './ReviewContainer.jsx';
import RestaurantDisplay from './RestaurantDisplay.jsx';
import RestaurantQuery from './RestaurantQuery.jsx';
import Container from '@mui/material/Container';
{
  /* <h1>This is a header</h1>
<h2>This is a secondary header</h2>
<h3>This is a tertiary header</h3> */
}

function MainContainer() {
    return (
        <Container disableGutters >
        <div>
            <h1>(rec(commend), res(taurants), next)</h1>
            <RestaurantQuery />
            <RestaurantDisplay />
            <ReviewContainer />
        </div>
        </Container>
    );
  }
  

export default MainContainer;
