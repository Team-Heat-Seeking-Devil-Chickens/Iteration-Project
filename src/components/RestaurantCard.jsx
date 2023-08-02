import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ReviewsModal from './ReviewsModal.jsx';

//deconstruct passed down info prop
const RestaurantCard = ({ info }) => {
  const {
    name,
    catagoies,
    rating,
    location,
    radius,
    price,
    reviews,
    imageUrl,
  } = info;

  return (
    <Card>
      <CardHeader title={name} subheader={`price tier: ${price}`} />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="where can we get alt image text from api?"
      />
      <CardContent>
        <Typography component="legend">
          <strong>Rating:</strong>
          <Rating
            name="read-only"
            value={rating}
            /*add rating value from */ readOnly
          />
        </Typography>
        <Typography>
          <strong>Price Tier:</strong> {price}
        </Typography>
        <Typography>
          <strong>Location:</strong> {location}
        </Typography>
        <Typography>
          <strong>Location Radius:</strong> {radius} km
        </Typography>
        <Typography>
          <strong>Cuisine:</strong> {catagoies}
        </Typography>
      </CardContent>
      <CardActions>
        <ReviewsModal reviews={reviews} />
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
