function sellerAuthMiddleware(req, res, next) {
  if (req.session.userLogged && (req.session.userLogged.rol_id == 1 || req.session.userLogged.rol_id == 2)) {
    next();
  } else {
        res.redirect('/unauthorized');
  }
}

module.exports = sellerAuthMiddleware;