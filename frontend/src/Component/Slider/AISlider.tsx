import React from 'react';

type AISliderProps = {
  open: boolean;
  onClose: () => void;
};

export default function AISlider({ open, onClose }: AISliderProps) {
  return (
    <aside className={`ai-slider ${open ? 'open' : ''}`} aria-hidden={!open}>
      <header className='ai-slider__header'>
        <h3>AI Generator</h3>
        <button
          className='ai-slider__close'
          onClick={onClose}
          aria-label='Close panel'
        >
          ×
        </button>
      </header>

      <div className='ai-slider__body'>
        {/* Put your generator UI here */}
        <p>Describe the image you want, pick a style, etc.</p>
      </div>

      <footer className='ai-slider__footer'>
        <button className='ai-slider__action'>Generate</button>
      </footer>
    </aside>
  );
}
