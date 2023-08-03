import React from 'react';
import {
  CardActions,
  Typography,
  Rating,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from '@mui/material';
import ReviewsModal from './ReviewsModal.jsx';

//deconstruct passed down info prop { info }
const RestaurantCard = ({ info, username }) => {
  const {
    id,
    // user_id,
    // username,
    name,
    // categories,
    rating,
    location,
    // radius,
    price,
    image_url,
  } = info;

  // info.username = user;

  // const info = {
  //   name: 'Restaurant Name',
  //   catagories: ['Mexican', 'Thai', 'Japanese'],
  //   rating: 4,
  //   location: 90210,
  //   radius: 5,
  //   price: '$$',
  //   reviews: [
  //     { username: 'Brian', review: 'test', rating: 3 },
  //     { username: 'Darius', review: 'test1', rating: 5 },
  //     { username: 'Duke', review: 'test3', rating: 4 },
  //     { username: 'Clay', review: 'test4', rating: 4 },
  //     { username: 'Hernan', review: 'test5', rating: 5 },
  //   ],
  //   image_Url:
  //     'https://cdn.discordapp.com/attachments/1136006174513307740/1136349347852861460/image.png',
  //   username: 'Brian',
  //   restaraunt_id: 'abcdefg',
  // };

  return (
    <Card>
      <CardHeader title={info.name} subheader={`price tier: ${info.price}`} />
      <CardMedia
        component="img"
        height="194"
        image={info.image_url}
        alt={info.name}
      />
      <CardContent>
        <Typography component="legend">
          <strong>Rating:</strong>
          <Rating
            name="read-only"
            value={info.rating}
            /*add rating value from */ readOnly
          />
        </Typography>
        <Typography>
          <strong>Price Tier:</strong> {info.price}
        </Typography>
        <Typography>
          <strong>Location:</strong> {info.location.display_address.join(', ')}
        </Typography>
        {/* <Typography>
          <strong>Location Radius:</strong> {info.radius} km
        </Typography> */}
        {/* <Typography>
          <strong>Cuisine:</strong> {info.catagories.join(', ')}
        </Typography> */}
      </CardContent>
      <CardActions>
        <ReviewsModal info={info} username={username} />
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
