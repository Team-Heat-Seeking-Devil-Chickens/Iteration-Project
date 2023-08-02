const sessionController = {};
const Session = require('../Models/SessionModel.js');

sessionController.startSession = (req, res, next) => {
  if (!res.locals._id) return next({
    log: 'error in sessionController.startSession',
    message: {
      err: 'error user id undefined'
    }
  })
  Session.find({ cookieId: res.locals._id }).then(session => {
    if (session.length) return next();
    else {
      Session.create({ cookieId: res.locals._id }).then(user => {
        return next();
      }).catch(err => next({
        log: 'error in sessionController.startSession',
        message: {
          err: `error creating session in db: ${err}`
        }
      }))
    }
  }).catch(err => next({
    log: 'error in sessionController.startSession',
    message: {
      err: `error finding session in db: ${err}`
    }
  }))
}

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid })
    .then(session => {
      if (!session) return res.redirect('/');
      else {
        return next();
      }
    }).catch((err) => {
      return next({
        log: 'error in sessionController.isLoggedIn',
        message: { err: 'an error occured' }
      })
    })
}

sessionController.endSession = (req, res, next) => {
  Session.findOneAndDelete({cookieId: req.cookies.ssid })
  .then((session) => {
    if (!session) {
      return next({
        log: 'error in sessionController.endSession',
        message: {
          err: 'no active session'
        }
      })
    } else {
      return next();
    }
  }).catch(err => next({
    log: 'error in sessionController.endSession',
    message: {
      err: `error finding session in db: ${err}`
    }
  }))
}

module.exports = sessionController;