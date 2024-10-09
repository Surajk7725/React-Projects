import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { mongoURI } from './config/keys.js';
import router from './routes/auth.js';
import initializePassport from './services/passport.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Google Passport 
app.use(passport.initialize());
initializePassport(passport);

// Middleware Routing
app.use('/auth', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
