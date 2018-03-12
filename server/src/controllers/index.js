exports.index = (req, res, next) => {
  if (req.session.username) {
    res.status(200).json({
      message: 'Hello, ' + req.session.username,
      accessToken: req.session.accessToken
    });
  } else {
    res.status(200).json({
      message: 'Authentication failed. Please login!',
      href: 'http://localhost:8000/login'
    });
  }
};

exports.login = (req, res, next) => {
  res.redirect('/auth/github');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};