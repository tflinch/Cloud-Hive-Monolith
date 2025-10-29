import React, { useState } from 'react';
import { uploadFile } from '../../services/api/api';

type AISliderProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (file: File, serverResult?: any) => void;
};

export default function AISlider({ open, onClose, onConfirm }: AISliderProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    setPreviewUrl(null);
    setPreviewFile(null);

    try {
      const resp = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          seed: 0,
          num_frames: 24,
          num_inference_steps: 25,
        }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || `Generation failed (${resp.status})`);
      }

      const data = await resp.json(); // expect { url, subtitles? }
      if (!data?.url) {
        console.log('Raw generation response:', data);
        throw new Error('No video URL returned by generator');
      }

      setPreviewUrl(data.url);
    } catch (e: any) {
      setError(e?.message || 'Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  }

  async function testWithPublicUrl() {
    const PUBLIC_MP4 =
      'https://filesamples.com/samples/video/mp4/sample_640x360.mp4';
    setPreviewUrl(PUBLIC_MP4);
  }

  async function handleConfirm() {
    if (!previewUrl) {
      setError('No preview to confirm');
      return;
    }
    setIsUploading(true);
    setError(null);

    try {
      const r = await fetch(previewUrl, { mode: 'cors' });
      if (!r.ok)
        throw new Error(`Could not fetch generated video (HTTP ${r.status})`);

      const blob = await r.blob();

      const extFromType = blob.type?.split('/')?.[1];
      const extFromUrl = previewUrl.split('?')[0].split('.').pop();
      const ext =
        (extFromType && extFromType.length <= 5 ? extFromType : null) ||
        (extFromUrl && extFromUrl.length <= 5 ? extFromUrl : null) ||
        'mp4';

      const file = new File([blob], `ai-video.${ext}`, {
        type: blob.type || 'video/mp4',
      });
      setPreviewFile(file);

      const result = await uploadFile(file);
      onConfirm?.(file, result);
    } catch (e: any) {
      console.error('[AI] Confirm error:', e);
      setError(e?.message || 'Failed to prepare/upload the video');
    } finally {
      setIsUploading(false);
    }
  }

  if (!open) return null;

  return (
    <aside
      className={`content__aside ${open ? 'open' : ''}`}
      aria-label='AI generation panel'
    >
      <header className='content__aside-header'>
        <h3>AI Generator</h3>
        <button
          className='content__aside-close'
          onClick={onClose}
          aria-label='Close panel'
        >
          ×
        </button>
      </header>

      <div className='content__aside-body'>
        <div className='content__aside-form'>
          <label htmlFor='aiPrompt'>Describe the video</label>
          <textarea
            id='aiPrompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='A cinematic shot of ocean waves at sunset…'
          />
          <button
            type='button'
            className='content__aside-action'
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? 'Generating…' : 'Generate Preview'}
          </button>
          {error && (
            <p className='content__aside-error' role='alert'>
              {error}
            </p>
          )}
        </div>

        <div className='content__aside-preview'>
          {!previewUrl && !isGenerating && (
            <div className='content__aside-placeholder'>
              Your preview will appear here
            </div>
          )}
          {isGenerating && (
            <div className='content__aside-skeleton' aria-busy='true' />
          )}

          {previewUrl && (
            <video controls style={{ width: '100%' }}>
              <source src={previewUrl} type='video/mp4' />
              Your browser does not support video.
            </video>
          )}
        </div>
      </div>

      <footer className='content__aside-footer'>
        <button
          className='content__aside-action'
          onClick={handleConfirm}
          disabled={!previewUrl || isUploading}
        >
          {isUploading ? 'Uploading…' : 'Use this video'}
        </button>

        <button
          type='button'
          className='content__aside-action'
          onClick={testWithPublicUrl}
        >
          Tester
        </button>
      </footer>
    </aside>
  );
}
