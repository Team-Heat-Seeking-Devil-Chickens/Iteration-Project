const userController = {};
const { User, Review } = require('../Models/UserModel');

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      return next({
        log: 'error in userController.verifyUser',
        message: {
          err: `No user found`
        }
      })
    }
    if (user.password === password) {
      res.locals = {
        authenticated: true,
        _id: user._id,
        zipcode: user.zipcode
      }
      return next();
    } else {
      return next({
        log: 'error in userController.verifyUser',
        status: 401,
        message: {
          err: `User not authenticated`
        }
      })
    }
  }).catch(err => next({
    log: 'error in userController.verifyUser',
    message: {
      err: `Error trying to find user: ${err}`
    }
  }))
}

userController.createUser = (req, res, next) => {
  const { username, password, zipcode } = req.body;

  if (!username || !password || !zipcode)
    return next({
      log: 'Missing username/password/zipcode in UserController.createUser',
      message: { err: 'An error occured' }
    })
  User.create({
    username,
    password,
    zipcode
  })
    .then((user) => {
      res.locals._id = user._id;
      console.log(res.locals._id);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error occurred in userController.createUser',
        message: { err: `Error trying to create user: ${err}` },
      });
    });
};

userController.getUserReview = (req, res, next) => {
  const { restaurantID, reviews } = req.body;
  Review.findOne({ restaurantID }).then((review) => {
    res.locals.reviews = review.reviews;
    return next()
  }).catch((error) => {
    return next({
      log: 'Error occurred in userController.gerUserReview',
      message: { err: `Error trying to find review: ${err}` },
    })
  })
}

module.exports = userController;