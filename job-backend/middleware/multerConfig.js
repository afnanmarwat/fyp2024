// const multer = require('multer');
// const path = require('path');

// // Define the storage location and filename for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the folder where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Define file filter to accept only certain types of files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
//   }
// };

// // Set up multer with the defined storage and file filter
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024 // Limit file size to 2 MB
//   }
// });

// module.exports = upload;
const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `profilePic-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Create multer instance
const upload = multer({ storage: storage });

module.exports = upload;

