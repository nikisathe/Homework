import React, { useState, useEffect } from "react";
import axios from "axios";

const Pending = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/assignments');
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
      <h2>Pending Assignments</h2>
      {assignments.map((assignment, index) => (
        <div key={index}>
          <h3>{`Assignment ${index + 1}`}</h3>
          <p>Title: {assignment.title}</p>
          <p>Deadline: {formatDate(assignment.deadline)}</p>
          <p>Created By: {assignment.created_by}</p>
          <p>Description: {assignment.description}</p>
          <button onClick={() => downloadFile(assignment.file, assignment.filename)}>
            Download File
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pending;
