// require model & pg-format
const db = require('./models.js');
const format = require('pg-format');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const userController = {
  authenticateSignup: (req, res, next) => {
    bcrypt
      .hash(req.body.pw, 10)
      .then(hashedPassword => {
        console.log('hashedPassword:', hashedPassword);

        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          pw: hashedPassword
        };
        // res.locals.user = user TO USE LATER WITH REAL AJAX CALL
        res.locals.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //creates new JWT as a string
        //creates cookie
        res.cookie('userToken', res.locals.accessToken, {
          httpOnly: true,
          domain: 'localhost',
          path: '/',
          expires: new Date(Date.now() + 9000000),
        });

        res.locals.successLoginData = {
          isSuccessful: true,
          email: user.email,
        };
        return next();
      })
      .catch((err) => {
        console.error(err);

        return next({
          log: `userController.authenticatesSignup failed to create JWT token in user registration, ${err.message}.`,
          status: 500,
          message: { err: 'Failed to create new JWT token.' },
        });
      })
  },

  authenticateLogin: (req, res, next) => {
    //find user in db via email first
    // const user = users.find(user => user.email === req.body.email);
    //refactor to thenable
    if (!user) {
      // User not found, return an error response indicating invalid credentials
      return next({
        log: 'userController.authenticateLogin failed: User not found.',
        status: 401, // Unauthorized status code
        message: { error: 'Invalid credentials.' },
      });
    }
    //compare passwords and save JWT to accessToken prop
    bcrypt.compare(req.body.pw, user.pw)
      .then(match => {
        if (match) {
          res.locals.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          console.log('woohoo new user loggine in!!!')

          return next();
        }
      })
      .catch(() => {
        return next({
          log: `userController.authenticateLogin failed to compare login details, ${err.message}.`,
          status: 500,
          message: { err: 'Failed to login.' },
        });
      })
  }

  // authenticate: (req, res, next) => {
  //   jwt.verify(
  //     req.cookies.usertoken,
  //     process.env.JWT_SECRET,
  //     (err, payload) => {
  //       if (err) {
  //         // console.log(err);
  //         // res.status(401).json({ verified: false });
  //         return next({
  //           log: 'userController.authenticate error:',
  //           status: 401,
  //           message: { error: 'Invalid credentials.' },
  //         })
  //       } else {
  //         console.log(payload);

  //         req.jwtpayload = payload;

  //         next();
  //       }
  //     }
  //   );
  // }

};

module.exports = userController;

