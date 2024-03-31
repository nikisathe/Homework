import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    description: '',
    file: '',
    createdby: '',
    filename:''
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

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);
    formDataToSend.append('createdby', formData.createdby);
    formDataToSend.append('filename', formData.filename);

    try {
       await axios.post('http://localhost:3001/assignment', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Assignment submitted successfully');
      // Reset form data after successful submission
      setFormData({
        title: '',
        deadline: '',
        description: '',
        file: '',
        createdby: '' ,
        filename: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/submitted');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const downloadFile = (fileData, filename) => {
    const blob = new Blob([new Uint8Array(fileData.data)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

 
  return (
    <div>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        <br /><br />

        <label htmlFor="deadline">Deadline:</label>
        <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
        <br /><br />

        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        <br /><br />

        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <br /><br />

        <label htmlFor="filename">Filename:</label> {/* Add filename field */}
        <input type="text" id="filename" name="filename" value={formData.filename} onChange={handleChange} />
        <br /><br />

        <label htmlFor="createdby">Created By:</label>
        <input type="text" id="createdby" name="createdby" value={formData.createdby} onChange={handleChange} />
        <br /><br />

        <button type="submit">Submit</button>
      </form>


      <div className="assignment-list">
        {assignments.map((assignment, index) => (
          <div key={index} className="assignment-item">
            <h3>{`Assignment ${index + 1}`}</h3>
            <p>Title: {assignment.title}</p>
            <p>Submission Date: {formatDate(assignment.submission_date)}</p>
            <p>Submitted By: {assignment.submitted_by}</p>
            <button onClick={() => downloadFile(assignment.file, assignment.filename)}>
            Download File
          </button>
            <p>Description: {assignment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherForm;
