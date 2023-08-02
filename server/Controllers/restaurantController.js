// require model & pg-format
const db = require('../models.js');
const format = require('pg-format');

const restaurantController = {};
const token = 'jRAUTCjFbYX0mAx44ncfKVTj4ca8bJYWfHt3qfVk10M928uff6eCHu731g9-lIqswaeVEkjtjQnmgrc34xCSVzLhQbB9aCPGV31cfBfHsxrQyZV82vqjRitvLk7JZHYx'
// middleware: obtain restaurants matching selected criteria from 'restaurants' in DB
restaurantController.getRestaurants = async (req, res, next) => {
  try {
    const { zipcode, categories, price } = req.body
    // array functionality - array to csv
    let query = `https://api.yelp.com/v3/businesses/search?${zipcode ? `&location=${zipcode}` : ''}&term=food&${categories ? `&categories=${categories}` : ''}${price ? `&price=${price}` : ''}&sort_by=distance&limit=40`
    const restaurantsList = await fetch(query, {method: "GET", headers: {
      Authorization: `Bearer ${token}`
    }} )
    res.locals.restaurants = await restaurantsList.json()
    console.log(res.locals.restaurants)
    next()
  } catch (err) {
    return next({
      log: `Express caught error in controller.getRestaurants: ${err}`,
      message: {
        err: 'An error occurred with fetching restaurant information.',
      },
    });
  }
};

// restaurant id, 1 - 5 rating, review text
// middleware: submit review information to 'reviews' in DB
// restaurantController.submitReview = async (req, res, next) => {
//   try {
//     const { staffAttitude, service, review, recommendation, bathroomVibe } =
//       req.body;

//     const reviewSubmission = `INSERT INTO review (staff_attitude, service, review, recommendation, bathroom_vibe)
//     VALUES ('${staffAttitude}', '${service}', '${review}', '${recommendation}', '${bathroomVibe}')
//     RETURNING *`;
//     const data = await db.query(reviewSubmission);
//     // console.log('data test', data.rows);
//     res.locals.addedReview = data.rows[0];
//     return next();
//   } catch (err) {
//     return next({
//       log: `Express caught error in controller.submitReview: ${err}`,
//       message: {
//         err: 'An error occurred with submitting your review.',
//       },
//     });
//   }
// };

module.exports = restaurantController;
