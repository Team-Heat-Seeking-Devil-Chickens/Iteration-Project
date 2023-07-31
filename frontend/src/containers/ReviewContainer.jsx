import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { changeProp } from '../reducers/reviewReducer';

const ReviewContainer = () => {
  const dispatch = useDispatch();

  //when the star is first 0, there is no star selected yet
  //this determines if a star is clicked or not
  const [starRating, setStarRating] = useState(1);
  //console.log(starRating) // logs the star -> send dispatch()?

  function handleStars(index) {
    //index = the star that was clicked
    //if the current star that was clicked is equal to the previous star (0, or previously clicked on star) - set the starRating to 0. otherwise, if you clicked in a different, star, we set the starRating to the star that was clicked
    setStarRating(index === starRating ? 0 : index);
    // console.log('the star i just clicked is', index);
    //console.log('this is the current starRating', starRating) //not updating bc state changes are async
    dispatch({ type: 'SET_STAR_RATING', payload: index });
  }
  return (
    <div className='reviewContainer'>
      <form>
        <div className='staffAttitude'>
          <label>How was the staff attitude? </label>
          <select>
            <option value="restaurant"></option>
            <option>Select</option>
            <option value='Friendly'>Friendly</option>
            <option value='Curt'>Curt</option>
            <option value='No boundaries'>No boundaries</option>
            <option value='Inappropiate'>Inappropiate</option>
            <option value='Flirty'>Flirty</option>
          </select>
        </div>
        <div className='bathroomVibeContainer'>
          <label>What are the bathroom vibes? </label>
          <select>
            <option>Select</option>
            <option value='has cleaning products inside'>
              Has cleaning products inside the restroom
            </option>
            <option value='gritty'>Gritty</option>
            <option value='instagramable'>Instagrammable </option>
            <option value="doesn't explicitly require employees to wash hands">
              Doesn't explicitly require employees to wash hands
            </option>
          </select>
        </div>
        <div className='submitReview'>
          <span>Review</span>
          <br></br>
          <textarea
            rows='5'
            cols='80'
            className='reviewContent'
            // onChange={(e) => dispatch(changeProp(['review', e.target.value]))}
          ></textarea>
        </div>
        <div className='rating'>
          <span>How was the service? </span>
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <span
              key={starIndex}
              className={`serviceStars ${
                starIndex <= starRating ? 'clicked' : ''
              }`}
              onClick={() => handleStars(starIndex)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ReviewContainer;
