const timeout = require('connect-timeout');

function logoutMiddleware(req, res, next) {
  // Reiniciar el temporizador
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);

  // Cancelar el temporizador anterior, si lo hay
  if (req.session.logoutTimer) {
    clearTimeout(req.session.logoutTimer);
  }

  // Crear un nuevo temporizador
  const timeoutLength = 5 * 60 * 1000; // 5 minutos en milisegundos
  req.session.logoutTimer = setTimeout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('La sesión ha sido cerrada por inactividad');
      }
      res.redirect('/');
    });
  }, timeoutLength);

  // Pasar al siguiente middleware
  next();
}

module.exports = timeout('5m'), logoutMiddleware;
