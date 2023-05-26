const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  filePath: {
    type: String,
    required: true,
    trim: true,
  },
  fileType: {
    type: String,
    required: true,
    trim: true,
  },
  fileSize: {
    type: Number,
    required: true,
    trim: true,
  },
});

const File = mongoose.model('File', UserSchema);

module.exports = File;