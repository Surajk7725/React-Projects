import express from 'express';
import bodyParser from 'body-parser'; // Parsing the JSON Data and make it available in 'request.body'
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Initializing the express,cors and body-parser
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using Compass
mongoose.connect('mongodb://localhost:27017/OTPVerification');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for storing email and otp
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});
const OTP = mongoose.model('OTP', otpSchema);


// Nodemailer Initialization
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'surajkumar.sk.pika.0807@gmail.com',
    pass: 'mlst wxkp kjgy lmxm',
  },
});

let otpStorage = {};

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  // const otp = Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6 digit OTP Number
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP Number
  otpStorage[email] = otp;

  // Save email and otp to MongoDB
  try {
    await OTP.create({ email, otp });
  } catch (error) {
    return res.status(500).send('Error saving OTP to database');
  }


  const mailOptions = {
    from: 'surajkumar.sk.pika.0807@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    }
    res.status(200).send('OTP sent');
  });
});


app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] === otp) {
    delete otpStorage[email];

    // Send welcome email after verifying OTP
    const welcomeMailOptions = {
      from: 'surajkumar.sk.pika.0807@gmail.com',
      to: email,
      subject: 'Instructions about our App',
      text: 'Welcome to our App! Explore all our pages, enjoy and gather whatever information you like.....',
    };

    transporter.sendMail(welcomeMailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error sending welcome email');
      }
      res.status(200).send('OTP verified and welcome email sent');
    });
  } else {
    res.status(400).send('Invalid OTP');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
