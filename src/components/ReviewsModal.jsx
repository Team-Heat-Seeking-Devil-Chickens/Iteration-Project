import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Review from './Review.jsx';

const ReviewsModal = ({ reviews }) => {
  const { reviews } = reviews;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const reviewList = reviews.map((el) => {
    <Review data={el} />;
  });

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="review-modal-title" variant="h6" component="h2">
            Reviews
          </Typography>
          {reviewList}
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewsModal;
