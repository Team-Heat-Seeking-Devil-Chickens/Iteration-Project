// require model & pg-format
const db = require('../backend/models.js');
const format = require('pg-format');

const controller = {};

// middleware: obtain restaurants matching selected criteria from 'restaurants' in DB
controller.getRestaurants = async (req, res, next) => {
  try {
    const {
      name,
      ambience,
      cuisine,
      priceTier,
      vegOptions,
      locationRadius,
      goodForGroups,
    } = req.body;

    const restaurantsQuery = `SELECT * from "restaurants"`;
    const data = await db.query(restaurantsQuery);
    console.log('data test', data.rows);
    res.locals.restaurants = data.rows;
    return next();
  } catch (err) {
    return next({
      log: `Express caught error in controller.getRestaurants: ${err}`,
      message: {
        err: 'An error occurred with fetching restaurant information.',
      },
    });
  }
};

// middleware: submit review information to 'reviews' in DB
controller.submitReview = async (req, res, next) => {
  try {
    const { staffAttitude, service, review, recommendation, bathroomVibe } =
      req.body;

    const reviewSubmission = `INSERT INTO review (staff_attitude, service, review, recommendation, bathroom_vibe)
    VALUES ('${staffAttitude}', '${service}', '${review}', '${recommendation}', '${bathroomVibe}')
    RETURNING *`;
    const data = await db.query(reviewSubmission);
    // console.log('data test', data.rows);
    res.locals.addedReview = data.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Express caught error in controller.submitReview: ${err}`,
      message: {
        err: 'An error occurred with submitting your review.',
      },
    });
  }
};

module.exports = controller;
