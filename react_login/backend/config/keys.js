import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

export { mongoURI, jwtSecret }