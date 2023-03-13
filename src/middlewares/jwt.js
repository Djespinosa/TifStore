const jwt = require('jsonwebtoken');

// Configuración de JWT
const jwtConfig = {
  secret: 'Deymer',
  expiresIn: '1h'
};

module.exports = {
  jwt,
  jwtConfig
};