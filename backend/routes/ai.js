// routes/ai.js
const express = require('express');
const router = express.Router();

async function getGradioClient() {
  const { Client } = await import('@gradio/client');
  return Client;
}

router.post('/generate', async (req, res) => {
  try {
    const {
      prompt,
      seed = 0,
      num_frames = 24,
      num_inference_steps = 25,
    } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt string is required' });
    }

    const Client = await getGradioClient();
    const client = await Client.connect('hysts/zeroscope-v2');

    const result = await client.predict('/run', {
      prompt,
      seed,
      num_frames,
      num_inference_steps,
    });

    // result.data is usually an array with one item
    const out = result?.data?.[0];

    // Try several shapes:
    // 1) a plain string URL
    // 2) object with { url }
    // 3) dict with { video: <string|{url:string}> }
    let url =
      (typeof out === 'string' && out) ||
      (out && typeof out.url === 'string' && out.url) ||
      (out && out.video && typeof out.video === 'string' && out.video) ||
      (out &&
        out.video &&
        typeof out.video.url === 'string' &&
        out.video.url) ||
      null;

    // Sometimes the Space returns a file-like path (e.g., "/file=...").
    // If you see something like "file=..." or a relative path, we can try to normalize.
    if (url && url.startsWith('file=')) {
      // Many Spaces serve files at <space-url>/file=<path>
      // client.config?.root or client.space?.host isn’t public API, so don’t rely on it.
      // Instead, return the raw data too so the frontend can decide how to handle.
      // (Some Spaces already return full https URLs, so you may not need this.)
    }

    if (!url) {
      // Return raw so you can inspect in the browser console and adjust parsing if needed.
      return res.status(200).json({ url: null, raw: result.data });
    }

    return res.json({ url, raw: result.data });
  } catch (err) {
    console.error('Generation failed:', err);
    res.status(500).json({ error: err.message || 'Generation failed' });
  }
});

module.exports = router;
