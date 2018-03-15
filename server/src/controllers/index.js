exports.login = (req, res, next) => {
  res.redirect('/auth/github');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};