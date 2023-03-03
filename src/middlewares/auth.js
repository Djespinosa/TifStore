function authMiddleware(req, res, next) {
  if (req.session.userLogged && req.session.userLogged.rol_id == 1) {
    next();
  } else {
        res.redirect('/unauthorized');
  }
}

module.exports = authMiddleware;