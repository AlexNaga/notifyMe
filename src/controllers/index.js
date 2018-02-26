exports.index = (req, res, next) => {
  res.status(200).json({
    message: 'Hello world!'
  });
};

exports.login = (req, res, next) => {
  res.redirect('/auth/github');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};