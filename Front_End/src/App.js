// import React, { useState } from 'react';
// import './ImmigrationForm.css'; // Import custom CSS file for styling
// // import axios from 'axios';
// function ImmigrationForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     nationality: '',
//     passportNumber: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //await axios.post('http://localhost:8080/api/person', formData); // Sending POST request to backend
//       alert('Form submitted successfully!');
//       // Reset form fields
//       setFormData({
//         name: '',
//         age: '',
//         nationality: '',
//         passportNumber: '',
//         address: ''
//       });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error submitting form. Please try again.');
//     }
//   };

//   return (
//     <div className="immigration-form-container">
//       <h1 className="form-title"> I-765 Immigration Form</h1>
//       <form onSubmit={handleSubmit} className="immigration-form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="age">Age:</label>
//           <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="nationality">Nationality:</label>
//           <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="passportNumber">Passport Number:</label>
//           <input type="text" id="passportNumber" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
//         </div>

//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default ImmigrationForm;


//Adding the login page
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import LoginPage from './LoginPage';
// import FormPage from './FormPage';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Switch>
//           <Route path="/" exact component={LoginPage} />
//           <Route path="/form/:username" component={FormPage} />
//           <Route path="/form/new" component={FormPage} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// // import './App.css';
// import FormPage from './FormPage';

// function App() {
//   return (
//     <div className="App">
//       <FormPage />
//     </div>
//   );
// }

// export default App;


// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './LoginPage';
import FormPage from './FormPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/form" element={<FormPage/>}/>
          {/* 
            Redirect any unknown routes to the LoginPage.
            The `from` prop is omitted here, as Redirect without `from` always redirects.
          */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


