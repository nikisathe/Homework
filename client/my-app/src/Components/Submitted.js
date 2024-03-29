import React, { useState, useEffect } from "react";
import "./Submitted.css";
import axios from "axios";

function Submitted() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await axios.get("http://localhost:3001/submitted");
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }
    fetchAssignments();
  }, []);
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString("en-US", { timeZone: "UTC" });
  };
  return (
    <div className=" Scontener2">
      <div className="Sbuten">
        <div but2>
          <h1 className="Senglish">English(101)</h1>
          <div className="Sbuttons2">
            <span>View</span>
            <span>Download</span>
            <span>SUBMIT</span>
          </div>
        </div>
      </div>

      {/* <div className="Scontener3">
        <h1 className="Sassign">Assign 1</h1>
        <div className="SData">
          <div className="Sbord">
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index}>
                  <li>Title: {assignment.title}</li>
                  <li>
                    Submission Date: {formatDate(assignment.submission_date)}
                  </li>
                  <li>submitted By:{assignment.submitted_by}</li>
                  <li>File: {assignment.file}</li>
                  <div className="Scontener4">
                    <h1 className="Sdescription">
                      Description: {assignment.description}
                    </h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
      <div className="assignment-list">
        {assignments.map((assignment, index) => (
          <div key={index} className="assignment-item">
            <h3>{`Assignment ${index + 1}`}</h3>
            <p>Title: {assignment.title}</p>
            <p>Submission Date: {formatDate(assignment.submission_date)}</p>
            <p>Submitted By: {assignment.submitted_by}</p>
            <p>File: {assignment.file}</p>
            <p>Description: {assignment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Submitted;
