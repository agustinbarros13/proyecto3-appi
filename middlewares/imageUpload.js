const multer = require('multer');
const cloudinary = require('./cloudinary'); // import cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.folder || 'default';
    return {
      folder: folder,
      format: 'jpg', 
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
