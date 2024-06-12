const express = require('express');
const router = express.Router();
const { upload, uploadFile, deleteFile } = require('../controllers/fileController');

router.post('/upload', upload.single('file'), uploadFile);
router.delete('/upload/:id', deleteFile);

module.exports = router;
