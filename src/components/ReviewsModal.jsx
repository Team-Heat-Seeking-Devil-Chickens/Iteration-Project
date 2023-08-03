import React from 'react';
import { useState, useEffect } from 'react';
import Review from './Review.jsx';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Rating,
  TextField,
  Modal,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Cookies from 'js-cookie';

const ReviewsModal = ({ info, username }) => {
  // const { reviews } = reviews;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    getSSIDCoookies();
    fetchReviews();
  };
  const handleClose = () => setOpen(false);
  // const [value, setValue] = useState(3);
  const [expanded, setExpanded] = useState(false);
  // const [reviewText, setReviewText] = useState('');
  const [reviewObject, setReviewObject] = useState({
    rating: 3,
    review: 'Write a review...',
    username_id: '',
    restaurantID: info.id,
  });
  const [reviews, setReviews] = useState([]);
  const [toggleRender, setToggleRender] = useState(false);
  const user = Cookies.get('ssid');

  useEffect(() => {
    fetchReviews();
  }, [toggleRender]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getSSIDCoookies = () => {
    setReviewObject({ ...reviewObject, username_id: user });
  };
  const fetchReviews = async () => {
    try {
      console.log(info.id);
      const response = await fetch('/getReviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ restaurantID: info.id }),
      });
      console.log(response);
      const data = await response.json();
      console.log('reviews data: ', data);
      const reviewList = [];
      data.reviews.forEach((data, index) => {
        reviewList.push(<Review data={data} key={index} />);
      });
      setReviews(reviewList);
    } catch (err) {
      console.log('Error fetching reviews data:', err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/reviews', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewObject),
    }).catch((err) => console.log(err));

    setToggleRender(!toggleRender);
  };

  // info.reviews.forEach((data) => {
  //   reviewList.push(<Review data={data} info={info} key={data.username} />);
  // });

  console.log('Review Object: ', reviewObject);
  return (
    <Box>
      <Button onClick={handleOpen}>Reviews</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {info.name} Reviews
              </Typography>
              <Typography component="legend">
                <strong>Rating: </strong>
                <Rating
                  name="rating"
                  id="rating"
                  value={reviewObject.rating}
                  onChange={(event, newValue) => {
                    setReviewObject({ ...reviewObject, rating: newValue });
                  }}
                />
              </Typography>
              <br></br>
              <TextField
                id="review"
                label="Review"
                multiline
                rows={4}
                // defaultValue="Write a review..."
                value={reviewObject.review}
                onChange={(event, value) => {
                  setReviewObject({
                    ...reviewObject,
                    review: event.target.value,
                  });
                }}
              />
            </CardContent>
            <CardActions>
              <Button variant="outlined" onClick={handleSubmit}>
                Submit Review
              </Button>
              <Button
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                show reviews
              </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography id="review-modal-title" variant="h6" component="h2">
                  Reviews:
                </Typography>
                {reviews}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReviewsModal;
