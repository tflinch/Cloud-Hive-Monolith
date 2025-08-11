import React from 'react';

function Hives() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Handle file upload here
    // You can add logic to handle the file upload, e.g., sending it to a server
    console.log('File uploaded:', formData.get('file'));
  };

  return (
    <div>
      <h2>Hives</h2>
      <form onSubmit={handleSubmit}>
        <h2>Upload Content</h2>
        <label htmlFor='file'>Select file:</label>
        <input type='file' id='file' name='file' accept='.mp4,.mp3' />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}

export default Hives;
