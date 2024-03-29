import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pending.css';

function Pending() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await axios.get('http://localhost:3001/assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    }
    fetchAssignments();
  }, []);

// Function to format date without time
const formatDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString('en-US', { timeZone: 'UTC' });
};


  return (
    <div className="contener2">
      <div className="buten">
        <div but2>
          <h1 className="english">English(101)</h1>
          <div className="buttons2">
            <span>View</span>
            <span>Download</span>
            <span>SUBMIT</span>
          </div>
        </div>
      </div>

      <div className="contener3">
        <h1 className="assign">Assign 1</h1>
        <div className="Data">
          <div className="bord">
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index}>
                  <span>Title: {assignment.title}</span><br />
                  <span>Submission Date: {formatDate(assignment.day)}</span><br />
<span>Deadline: {formatDate(assignment.deadline)}</span><br />

                  <span>File: {assignment.file}</span><br />
                  <span>Created By: {assignment.created_by}</span><br />
                  <div className="contener4">
                    <h1 className="description">Description: {assignment.description}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending;
