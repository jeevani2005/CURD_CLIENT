// src/components/FacultyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyLIst() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_FACULTY;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${API_URL}/faculty`);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, designation, experience };
      if (editingId) {
        await axios.put(`${API_URL}/faculty/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/faculty`, facultyData);
      }
      setName('');
      setDesignation('');
      setExperience('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/faculty/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (facultyMember) => {
    setEditingId(facultyMember._id);
    setName(facultyMember.name);
    setDesignation(facultyMember.designation);
    setExperience(facultyMember.experience);
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f9f9f9',
    },
    form: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cardList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '500px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    cardButtons: {
      display: 'flex',
      gap: '10px',
    },
    editButton: {
      padding: '5px 10px',
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    deleteButton: {
      padding: '5px 10px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Faculty List</h2>
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Experience (years)"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <button style={styles.button} onClick={saveFaculty}>
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>

      <div style={styles.cardList}>
        {faculty.map((facultyMember) => (
          <div key={facultyMember._id} style={styles.card}>
            <div style={styles.cardInfo}>
              <span><strong>{facultyMember.name}</strong></span>
              <span>Designation: {facultyMember.designation}</span>
              <span>Experience: {facultyMember.experience} years</span>
            </div>
            <div style={styles.cardButtons}>
              <button style={styles.editButton} onClick={() => editFaculty(facultyMember)}>
                Edit
              </button>
              <button style={styles.deleteButton} onClick={() => deleteFaculty(facultyMember._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyLIst;
