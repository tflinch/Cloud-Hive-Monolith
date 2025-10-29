import React, { useEffect, useState } from 'react';
import { uploadFile } from '../../services/api/api';
import AISlider from '../Slider/AISlider';

function Hives() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    if (!isSliderOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsSliderOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSliderOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file') as File | null;
    if (!file) return;

    const response = await uploadFile(file);
    if ((response as any).error) {
      console.error('Error uploading file:', (response as any).error);
    } else {
      console.log('File uploaded successfully:', (response as any).data);
    }
  };

  const handleConfirmGeneratedVideo = (_file: File, serverResult?: any) => {
    console.log('Generated video uploaded:', serverResult);
  };

  return (
    <section className='main__dashboard'>
      {/* Two-column grid toggles only when slider is open */}
      <div className={`content ${isSliderOpen ? 'content--with-aside' : ''}`}>
        {/* Primary column (card) */}
        <div className='content__main'>
          <form onSubmit={handleSubmit}>
            <h2>Upload Curated Content</h2>
            <label htmlFor='file'>Select file:</label>
            <input
              type='file'
              id='file'
              name='file'
              accept='.mp4,.mp3,.png,.jpg,.jpeg'
            />
            <button type='submit'>Upload</button>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <h2>Generate with AI</h2>
            <button onClick={() => setIsSliderOpen(true)}>
              Generate with AI
            </button>
          </div>
        </div>

        {/* IMPORTANT: do NOT wrap AISlider in another .content__aside.
            AISlider itself returns <aside class="content__aside ..."> */}
        <AISlider
          open={isSliderOpen}
          onClose={() => setIsSliderOpen(false)}
          onConfirm={handleConfirmGeneratedVideo}
        />
      </div>
    </section>
  );
}

export default Hives;
