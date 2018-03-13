// module.exports = (req, res, next) => {
//   console.log(req.user);

//   if (req.user) {
//     return next();
//   }
//   // res.redirect('/login')
//   return res.status(401).json({
//     message: 'Authentication failed. You need to be logged in to access this resource.'
//   });
// };

module.exports = (req, res, next) => {
  let username = 'user';

  if (typeof (username) !== 'undefined') {
    return next();
  } else {
    return res.status(401).json({
      message: 'Authentication failed. You need to be logged in to access this resource.',
      href: "http://localhost:8000/login"
    });
  }
};