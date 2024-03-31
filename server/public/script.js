// script.js
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to upload file.');
    }
    alert('File uploaded successfully.');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while uploading the file.');
  });
});
