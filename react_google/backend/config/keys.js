import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;

export {mongoURI, googleClientID, googleClientSecret, jwtSecret}
  