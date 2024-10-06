
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer")

// Configure Cloudinary with credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Set up Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'workouts', // Folder name in Cloudinary
        format: async (req, file) => 'png', // Format of the uploaded image
        public_id: (req, file) => file.originalname.split('.')[0], // File name in Cloudinary
    },
});

// Multer middleware configured with Cloudinary storage
const upload = multer({ storage });

module.exports = { upload, cloudinary };

