const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { UploadedFile } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const uploadFile = async (req, res) => {
  const file = req.file;
  const fileBuffer = fs.readFileSync(file.path);
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

  const existingFile = await UploadedFile.findOne({ where: { hash } });
  if (existingFile) {
    fs.unlinkSync(file.path); // Delete the newly uploaded duplicate file
    return res.status(409).json({ error: 'File already exists' });
  }

  const uploadedFile = await UploadedFile.create({ filename: file.filename, hash });
  res.status(201).json(uploadedFile);
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  const file = await UploadedFile.findByPk(id);
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  fs.unlinkSync(path.join(__dirname, '../uploads', file.filename));
  await file.destroy();
  res.status(204).end();
};

module.exports = {
  upload,
  uploadFile,
  deleteFile,
};
