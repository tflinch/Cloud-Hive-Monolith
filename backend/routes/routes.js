const express = require('express');
const controller = require('../controllers/controller');
const multer = require('multer');

const router = express.Router();

// memory storage for forwarding buffers to Flask
const upload = multer({ storage: multer.memoryStorage() });

// NOTE: do NOT prefix with /api here because app.js already mounts at /api
router.get('/', controller.getData);
router.post('/data', controller.postData);
router.post('/upload', upload.single('file'), controller.forwardUploadToFlask);

module.exports = router;
