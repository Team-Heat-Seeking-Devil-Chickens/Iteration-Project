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

const ReviewsModal = ({ info }) => {
  // const { reviews } = reviews;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [value, setValue] = useState(3);
  const [expanded, setExpanded] = useState(false);
  // const [reviewText, setReviewText] = useState('');
  const [reviewObject, setReviewObject] = useState({
    rating: 3,
    reviewText: 'Write a review...',
    username: info.username,
    restaraunt_id: info.restaraunt_id,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/review', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewObject),
    }).catch((err) => console.log(err));
  };

  const reviewList = [];

  info.reviews.forEach((data) => {
    reviewList.push(<Review data={data} info={info} key={data.username} />);
  });

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
                value={reviewObject.reviewText}
                onChange={(event, value) => {
                  setReviewObject({
                    ...reviewObject,
                    reviewText: event.target.value,
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
                {reviewList}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReviewsModal;
