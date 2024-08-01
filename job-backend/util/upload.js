const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to set up multer storage engine
const uploads = (uploadDir) => {
  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Set up storage engine
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // specify the upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // unique file name
    },
  });

  // File filter to validate file type
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  };

  return multer({ storage: storage, fileFilter: fileFilter });
};

module.exports = uploads;
