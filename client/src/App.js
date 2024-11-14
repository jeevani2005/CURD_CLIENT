import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyLIst'; // Check the file name here

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ display: 'flex', gap: '50px', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Student</Link>
          <Link to="/faculty" style={{ color: '#fff', textDecoration: 'none' }}>Faculty</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/faculty" element={<FacultyList />} /> {/* Ensure this path is "/faculty" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
