import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/imageUploads', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalName: String,
    createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const newImage = new Image({
        filename: req.file.filename,
        path: req.file.path,
        originalName: req.file.originalname
    });

    try {
        const savedImage = await newImage.save();
        res.json({ filePath: savedImage.filename });
    } catch (error) {
        res.status(500).send('Error saving image to database.');
    }
});

// Endpoint to get all images
app.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).send('Error retrieving images from database.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

