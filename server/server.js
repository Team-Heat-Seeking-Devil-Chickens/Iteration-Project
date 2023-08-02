const express = require('express');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const fetch = require('node-fetch');
const cors = require('cors');


const app = express();
const PORT = 3000;

const restaurantController = require('./Controllers/restaurantController.js')
const cookieController = require('./Controllers/cookieController.js');
const sessionController = require('./Controllers/sessionController.js');
const userController = require('./Controllers/userController.js');

const MONGO_URI = 'mongodb+srv://clhilgert:xdxblRkWtfc2ySyq@cluster0.ecdzfa9.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'devil-chicken'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// on login submit
app.post('/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setCookies,
  (req, res) => res.status(200).json(res.locals));

// on signup submit
app.post('/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookies,
  (req, res) => res.status(200).json(res.locals.user));
//  maybe just send res.locals.user
// check if session exists if accessing /main
app.get('/main',
  sessionController.isLoggedIn,
  (req, res) => res.status(200).json({ message: 'user is logged in' }));

// on logout click
app.delete('/logout',
  sessionController.endSession,
  cookieController.removeCookies,
  (req, res) => res.status(200).json({ message: 'session has ended' }));

// restaurant get
app.get('/restaurant', restaurantController.getRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants)
})

// reviews get
app.get('/reviews', restaurantController.getReviews, (req, res) => {
  res.status(200).json(res.locals.result)
})

// review post
app.post('/reviews', restaurantController.submitReview, (req, res) => {
  res.status(200).json(res.locals.result)
})


// 404
app.use((req, res) => res.status(404).send('page not found, L'))

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'global error handler caught unknown middleware error',
    status: 500,
    message: { err: 'an error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
})

// start server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})



















// const express = require('express');
// const fetch = require('node-fetch');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// // import controller file
// const controller = require('./controller.js');
// const userController = require('./Controllers/userController.js');
// const cookieController = require('/Controllers/cookieController.js')
// // enable cors + parse json
// app.use(cors());
// app.use(express.json());

// // GET route: 'read' queries to restaurants table
// app.get('/restaurants', controller.getRestaurants, (req, res) =>
//   res.status(200).json(res.locals.restaurants)
// );

// app.post('/restaurants', controller.getRestaurants, (req, res) =>
//   res.status(200).json(res.locals.restaurants)
// );

// // POST route: 'create' entries to insert into reviews table
// app.post('/reviews', controller.submitReview, (req, res) =>
//   res.status(200).json(res.locals.addedReview)
// );

// // GET route: 'GET' all reviews for a restaurant
// app.get('/reviews', userController.getUserReview, (req,res) => {
//   res.status(200).json(res.locals.reviews)
// });

// // USER ACCOUNT FUNCTIONALITY
// app.get('/logout', userController.clearSSIDCookie, (req,res) => {
//   res.sendStatus(200)
// });

// app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req ,res) => [
//   res.status(200).send('Worked')
// ])

// app.post('/signup', userController.createUser, cookieController.setSSIDCookie, (req,res) => {
//   res.status(200).send('Worked')
// })

// // unknown route handler
// app.use((req, res) => res.sendStatus(404));

// // global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express caught unknown error in global error handler',
//     status: 500,
//     message: { err: 'An error occurred.' },
//   };
//   const errorObj = Object.assign({ ...defaultErr, ...err });
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message.err);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on localhost:${PORT}...`);
// });
