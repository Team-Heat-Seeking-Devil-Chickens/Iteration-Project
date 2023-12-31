const cookieController = {};

cookieController.setCookies = (req, res, next) => {
  if (!res.locals._id)
    return next({
      log: 'error in cookieController.setSSIDCookie',
      message: {
        err: 'err user id undefined',
      },
    });
  res.cookie('ssid', res.locals._id);
  res.cookie('zipcode', res.locals.zipcode);
  delete res.locals._id;
  delete res.locals.zipcode;
  return next();
};

cookieController.removeCookies = (req, res, next) => {
  try {
    res.clearCookie('ssid');
    res.clearCookie('zipcode');
    return next();
  } catch {
    return next({
      log: 'error in cookieController.removeCookies',
      message: {
        err: 'error trying to delete cookies',
      },
    });
  }
};

module.exports = cookieController;
