// // LoginPage.js

// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [redirectToForm, setRedirectToForm] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);

//   const handleLogin = async () => {
//     // Check if username is valid (e.g., exists in a database)
//     const isValidUsername = await checkUsernameValidity(username);

//     if (isValidUsername) {
//       // Redirect to form page
//       setRedirectToForm(true);
//       setIsNewUser(false);
//     } else {
//       // Prompt user to fill out form from scratch
//       setIsNewUser(true);
//     }
//   };

//   const checkUsernameValidity = async (username) => {
//     // Mock function to simulate username validation
//     // Replace with actual validation logic (e.g., check against a database)
//     return username === 'existingUser';
//   };

//   if (redirectToForm) {
//     return <Redirect to={`/form/${username}`} />;
//   }

//   if (isNewUser) {
//     return <Redirect to="/form/new" />;
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h2>Login</h2>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes as Switch, Navigate as Redirect } from 'react-router-dom';
// import './LoginPage.css'; // Import CSS file for styling

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [redirectToForm, setRedirectToForm] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);

//   const handleLogin = async () => {
//     // Check if username is valid (e.g., exists in a database)
//     const isValidUsername = await checkUsernameValidity(username);

//     if (isValidUsername) {
//       // Redirect to form page
//       setRedirectToForm(true);
//       setIsNewUser(false);
//     } else {
//       // Prompt user to fill out form from scratch
//       setIsNewUser(true);
//     }
//   };

//   const checkUsernameValidity = async (username) => {
//     // Mock function to simulate username validation
//     // Replace with actual validation logic (e.g., check against a database)
//     return username === 'existingUser';
//   };

//   if (redirectToForm) {
//     // Redirect to the form page with the username as a parameter
//     return <Redirect to={`/form/${username}`} />;
//   }

//   if (isNewUser) {
//     // Redirect to the form page for new user
//     return <Redirect to="/form/" />;
//   }

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <div className="input-group">
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div className="button-group">
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes as Switch, Navigate as Redirect } from 'react-router-dom';
// import './LoginPage.css'; // Import CSS file for styling

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRetrieveDetails = async () => {
//     try {
//       const response = await fetch(`http://18.223.122.141:8000/api/user/${username}`);
//       const data = await response.json();
//       if (response.ok) {
//         // User details retrieved successfully, redirect to form
//         setMessage('');
//         // Redirect to form here
//       } else {
//         // User not found, show message to create user
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error('Error retrieving user details:', error);
//       setMessage('Error retrieving user details. Please try again later.');
//     }
//   };

//   const handleCreateUser = async () => {
//     try {
//       const response = await fetch('http://18.223.122.141:8000/api/user/create/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // User created successfully
//         setMessage('Username created');
//         // Show alert for username created
//         alert('Username created');
//       } else {
//         // User already exists, show error message
//         setMessage(data.username[0]);
//       }
//     } catch (error) {
//       console.error('Error creating user:', error);
//       setMessage('Error creating user. Please try again later.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <div className="input-group">
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div className="button-group">
//         <button onClick={handleRetrieveDetails}>Retrieve Details</button>
//         <button onClick={handleCreateUser}>Create User</button>
//       </div>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook to handle redirects
import './LoginPage.css'; // Import CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate(); // Create history object for programmatic navigation

  const handleRetrieveDetails = async () => {
    // try {
      const response = await fetch(`http://18.223.122.141:8000/api/user/${username}`);
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        // User details retrieved successfully, redirect to form with details
        console.log('User details:', data);
        // Redirect to form page with received details
        history('/form', { state: { userDetails: data } });
      } else {
        // User not found, show message to create user
        if (data.message === "Username does not exist") {
          setMessage(data.message);
        } else {
          // Handle other error messages, if any
          setMessage('Error: ' + data.message);
        }
      }
    // } catch (error) {
    //   console.error('Error retrieving user details:', error);
    //   setMessage('Error retrieving user details. Please try again later.');
    // }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        // User created successfully
        setMessage('Username created');
        // Show alert for username created
        alert('Username created');
      } else {
        // User already exists, show error message
        setMessage(data.username[0]);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Error creating user. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleRetrieveDetails}>Retrieve Details</button>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LoginPage;
