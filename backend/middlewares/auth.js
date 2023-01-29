const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // eslint-disable-next-line no-undef
  const token = cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Используйте действительную почту и пароль'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secretKey');
  } catch (err) {
    next(new UnauthorizedError('Используйте действительную почту и пароль'));
  }

  req.user = payload;
  next();
};
