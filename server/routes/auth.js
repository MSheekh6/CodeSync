const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Try again later.' }
});
const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/'
};

function issueToken(response, user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  const token = jwt.sign({ id: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  response.cookie('token', token, cookieOptions);
}

function validateSignup({ username, email, password }) {
  if (typeof username !== 'string' || !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    return 'Username must be 3-20 characters using only letters, numbers, and underscores.';
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return null;
}

router.post('/signup', authLimiter, async (request, response) => {
  try {
    const { username, email, password } = request.body || {};
    const validationError = validateSignup({ username, email, password });
    if (validationError) return response.status(400).json({ error: validationError });

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ $or: [{ username }, { email: normalizedEmail }] });
    if (existingUser) return response.status(409).json({ error: 'Username or email is already in use.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email: normalizedEmail, passwordHash });
    issueToken(response, user);
    return response.status(201).json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'Username or email is already in use.' });
    console.error('Signup failed:', error.message);
    return response.status(500).json({ error: 'Unable to create account.' });
  }
});

router.post('/login', authLimiter, async (request, response) => {
  try {
    const { email, password } = request.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return response.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!user || !passwordMatches) return response.status(401).json({ error: 'Invalid email or password.' });

    issueToken(response, user);
    return response.json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Login failed:', error.message);
    return response.status(500).json({ error: 'Unable to log in.' });
  }
});

router.post('/logout', (request, response) => {
  response.clearCookie('token', { ...cookieOptions, maxAge: undefined });
  return response.json({ success: true });
});

router.get('/me', authMiddleware, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select('_id username email');
    if (!user) return response.status(401).json({ error: 'Authentication required' });
    return response.json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Session lookup failed:', error.message);
    return response.status(401).json({ error: 'Authentication required' });
  }
});

module.exports = router;
