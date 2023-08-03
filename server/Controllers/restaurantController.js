// require model & pg-format
const { Review, User } = require('../Models/UserModel.js');

const restaurantController = {};
const token =
  'j0nRAAf-E_JVWfqXe8d5FZgIODP5JM1Hl2CiJ2CHpRnGo22CLflVZxsogEVFW8wc9mIgzH1trXnzniaSgWH1QfP5NxKkmjwLsHvfvTJQSL-2BvZ0f8JQXduz7u_LZHYx';
restaurantController.getRestaurants = async (req, res, next) => {
  try {
    const { zipcode, categories, price, radius } = req.body
    let query = `https://api.yelp.com/v3/businesses/search?${zipcode ? `&location=${zipcode}` : ''}&term=food&${categories ? `&categories=${categories}` : ''}${price ? `&price=${price}` : ''}${radius ? `&radius=${radius}` : ''}&sort_by=distance&limit=40`
    const restaurantsList = await fetch(query, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.locals.restaurants = await restaurantsList.json();
    next();
  } catch (err) {
    return next({
      log: `Express caught error in restaurantController.getRestaurants: ${err}`,
      message: {
        err: 'An error occurred with fetching restaurant information.',
      },
    });
  }
};

restaurantController.getReviews = async (req, res, next) => {
  try {
    const { restaurant_id, username_id } = req.body;
    const reviewList = await Review.findOne({
      restaurant_id: restaurant_id,
    }).then((response) =>
      response.json().then((result) => {
        res.locals.result = {
          reviews: result.reviews,
          rating: result.total / result.count,
        };
        next();
      })
    );
  } catch (err) {
    return next({
      log: `Express caught error in controller.getRestaurants: ${err}`,
      message: {
        err: 'An error occurred with fetching restaurant information.',
      },
    });
  }
};

restaurantController.submitReview = async (req, res, next) => {
  try {
    const { restaurant_id, username_id, rating, review } = req.body;
    const decodedString = decodeURIComponent(username_id);
    const sanitizedId = decodedString.replace(/^j:"|"/g, '');
    let name;
    await User.findOne({ _id: sanitizedId }).then((response) => {
      name = response.username;
    });
    const response = await Review.findOne({ restaurantID: restaurant_id });
    if (!response) {
      Review.create({
        restaurantID: restaurant_id,
        reviews: [{ username: name, rating: rating, review: review }],
        total: rating,
        count: 1,
      }).then(() => {
        Review.findOne({ restaurantID: restaurant_id })
          .then((response) => {
            res.locals.result = {
              reviews: response.reviews,
              totalRating: (
                Math.round((response.total / response.count) * 2) / 2
              ).toFixed(1),
            };
          })
          .then(() => {
            return next();
          });
      });
    } else {
      Review.updateOne(
        { restaurantID: restaurant_id },
        {
          $push: {
            reviews: { username: name, rating: rating, review: review },
          },
        }
      )
        .updateOne({ restaurantID: restaurant_id }, { $inc: { count: 1 } })
        .updateOne({ restaurantID: restaurant_id }, { $inc: { total: rating } })
        .then(() => {
          Review.findOne({ restaurantID: restaurant_id })
            .then((response) => {
              res.locals.result = {
                reviews: response.reviews,
                totalRating: (
                  Math.round((response.total / response.count) * 2) / 2
                ).toFixed(1),
              };
            })
            .then(() => {
              return next();
            });
        });
    }
  } catch (err) {
    return next({
      log: `Express caught error in controller.submitReview: ${err}`,
      message: {
        err: 'An error occurred with submitting your review.',
      },
    });
  }
};

module.exports = restaurantController;
