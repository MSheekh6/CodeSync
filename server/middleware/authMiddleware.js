const jwt = require('jsonwebtoken');

function getTokenFromRequest(request) {
  const cookies = request.headers.cookie || '';
  const tokenCookie = cookies.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith('token='));
  return tokenCookie ? decodeURIComponent(tokenCookie.slice('token='.length)) : null;
}

function authMiddleware(request, response, next) {
  const token = getTokenFromRequest(request);
  if (!token || !process.env.JWT_SECRET) {
    return response.status(401).json({ error: 'Authentication required' });
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Authentication required' });
  }
}

module.exports = { authMiddleware, getTokenFromRequest };
