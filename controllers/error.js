const getSafeCsrfToken = req => {
  try {
    return req.csrfToken ? req.csrfToken() : '';
  } catch (error) {
    return '';
  }
};

exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    path: null,
    isAuthenticated: req.session ? req.session.isLoggedIn : false,
    csrfToken: getSafeCsrfToken(req)
  });
};

exports.get500 = (error, req, res, next) => {
  console.log(error);
  res.status(500).render('500', {
    title: 'Unexpected Error',
    path: null,
    isAuthenticated: req.session ? req.session.isLoggedIn : false,
    csrfToken: getSafeCsrfToken(req)
  });
};

