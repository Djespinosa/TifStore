const timeout = require('connect-timeout');

function logoutMiddleware(req, res, next) {
  // Si ya existe un temporizador activo, no hacer nada
  if (req.session.logoutTimer) {
    return next();
  }

  // Reiniciar el temporizador
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);

  // Middleware para cerrar la sesión por inactividad
  req.session.logoutTimer = timeout('2m')(req, res, function() {
    req.session.destroy(function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('La sesión ha sido cerrada por inactividad');
      }
      res.redirect('/');
    });
  });

  // Pasar al siguiente middleware
  next();
}

module.exports = logoutMiddleware;
