// require model & pg-format
const db = require('../backend/models.js');
const format = require('pg-format');

const controller = {};

// middleware: obtain restaurants matching selected criteria from 'restaurants' in DB
controller.getRestaurants = async (req, res, next) => {
  try {
    let restaurantsQuery = `SELECT * from "restaurants"`;
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

module.exports = controller;
