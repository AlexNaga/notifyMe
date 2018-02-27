exports.index = (req, res, next) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.status(200).json({
      message: 'You visited this page ' + req.session.page_views + ' times',
      accessToken: req.session.accessToken
    });
  } else {
    req.session.page_views = 1;
    res.send('Welcome to this page for the first time!');
  }
};

exports.login = (req, res, next) => {
  res.redirect('/auth/github');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};