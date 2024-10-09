import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/keys.js';
import initializePassport from '../services/passport.js';

initializePassport(passport);

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), async (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
      email: req.user.email
    }
  };
  jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.redirect('http://localhost:3000/home');
  });
});

router.get('/current_user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json(decoded.user);
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('http://localhost:3000/login');
});

export default router;
