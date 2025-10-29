// routes/routes.js
const express = require('express');
const multer = require('multer');
const controller = require('../controllers/controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', controller.getData);
router.post('/data', controller.postData);
router.post('/upload', upload.single('file'), controller.forwardUploadToFlask);

module.exports = router;
