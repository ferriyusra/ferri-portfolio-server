const express = require('express');
const router = express.Router();
const controller = require('./controller');
const upload = require('../../middleware/multer');

router.post('/uploads', upload.single('image'), controller.uploadImage);

module.exports = router;
