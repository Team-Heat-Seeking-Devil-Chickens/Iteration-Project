// const stars = [];
// for (let i = 0; i < 5; i++) {
//   const star
//   stars.push(
//     <span key={i} className={i < rating ? "star filled" : "star"}>
//       &#9733;
//     </span>
//   );
// }

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeProp } from "../reducers/reviewReducer";

const reviewContainer = () => {
  const dispatch = useDispatch();

  return (
    <div className="reviewContainer">
      <input
        className="reviewContent"
        onChange={(e) => dispatch(changeProp(["review", e.target.value]))}
      ></input>
    </div>
  );
};

export default reviewContainer;
