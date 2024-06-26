import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const StudentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    submissiondate: '',
    description: '',
    file: '',
    submitedby: '',
    filename: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
      filename: e.target.files[0].name 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send file data
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('submissiondate', formData.submissiondate);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);
    formDataToSend.append('submitedby', formData.submitedby);
    formDataToSend.append('filename', formData.filename);
    try {
      // Send POST request to server
       await axios.post('http://localhost:3001/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Assignment submitted successfully');
      // Reset form after successful submission
      setFormData({
        title: '',
        submissiondate: '',
        description: '',
        file: '',
        submitedby: '',
        filename:'',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        <br /><br />

        <label htmlFor="submissiondate">submissiondate:</label>
        <input type="date" id="submissiondate" name="submissiondate" value={formData.submissiondate} onChange={handleChange} />
        <br /><br />

        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        <br /><br />

        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file"   onChange={handleFileChange} />
        <br /><br />

        <label htmlFor="filename">Filename:</label> {/* Add filename field */}
        <input type="text" id="filename" name="filename" value={formData.filename} onChange={handleChange} />
        <br /><br />
        
        <label htmlFor="submitedby">submited By:</label>
        <input type="text" id="submitedby" name="submitedby" value={formData.submitedby} onChange={handleChange} />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;
