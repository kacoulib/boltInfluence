const multer = require('multer');

const kycFileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fields: 0,
    fileSize: 7e6, // 7 MB
    files: 1,
  },
}).single('document');

module.exports = {
  kycFileUpload,
};
