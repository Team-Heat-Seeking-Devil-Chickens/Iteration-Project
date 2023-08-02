// require model & pg-format
const db = require('./models.js');
const format = require('pg-format');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = []; //DELETE ME! i am a temporary database replacement


const userController = {
  authenticateRegister: (req, res, next) => {
    bcrypt.hash(req.body.pw, 10).then(hashedPassword => {
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          pw: hashedPassword
        };
        // res.locals.user = user TO USE LATER WITH REAL AJAX CALL
        users.push(user); //TODO: DELETE ME LATER
        // res.locals.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //creates new JWT as a string
        return next();
      })
      .catch((err) => {
        return next({
          log: `userController.authenticateRegister failed to create JWT token, ${err.message} ${JSON.stringify(users)}.`,
          status: 500,
          message: { err: 'Failed to create new JWT token.' },
        });
      })
  },

  authenticateLogin: (req, res, next) => {
    //find user in db
    const user = users.find(user => user.name === req.body.name);
    bcrypt.compare(req.body.password, user.password)
      .then(match => {
        if (match) {
          res.locals.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
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

};

module.exports = userController;

