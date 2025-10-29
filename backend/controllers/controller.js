const axios = require('axios');
const FormData = require('form-data');

const FLASK_BASE_URL = process.env.FLASK_BASE_URL || 'http://192.168.1.16:5000';

exports.getData = (req, res) => {
  res.json({ message: 'Data fetched successfully' });
};

exports.postData = (req, res) => {
  const { data } = req.body;
  res.json({ message: 'Data posted successfully', data });
};

exports.forwardUploadToFlask = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size,
    });

    const flaskResp = await axios.post(`${FLASK_BASE_URL}/upload-video`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 120000,
    });

    // Relay Flask response back to the client
    return res.status(flaskResp.status).json(flaskResp.data);
  } catch (err) {
    console.error(
      'Forwarding to Flask failed:',
      err?.response?.data || err.message
    );
    const status = err?.response?.status || 500;
    return res.status(status).json({
      error: 'Upload failed',
      detail: err?.response?.data || err.message,
    });
  }
};
