import React from 'react';
import { Card, CardContent, Typography, Rating } from '@mui/material';

const Review = ({ data }) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>User: {data.username}</Typography>
          <Typography component="legend">
            Rating: <Rating name="read-only" value={data.rating} readOnly />
          </Typography>
          <Typography>Review: {data.review}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Review;
