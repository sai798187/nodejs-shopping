//module.exports = (req, res, next) => {
 // if (!req.session.isLoggedIn) {
 //   return res.redirect('/login');
 // }
 // next();
//}
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session ? req.session.isLoggedIn : false;
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
  next();
});
