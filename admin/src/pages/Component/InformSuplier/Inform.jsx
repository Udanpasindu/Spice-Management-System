import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Nav from '../Nav/Nav';

function Inform() {
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Perform validation
    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!message) {
      setErrorMessage('Please enter your message.');
      return;
    }

    // If all validations pass, send the email
    emailjs
      .sendForm(
        'service_j1s5iy4', 
        'template_4zljjin', 
        form.current, 
        {
          publicKey: '9Tblzqu-QQnsHkxIO',
        }
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message Send Success!");
          setErrorMessage('');
        },
        (error) => {
          console.log(error.text);
          alert("Message Send Failed!");
        }
      );
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <Nav />
      <br></br>
      <center>
      <div>

      <h1>Contact Supply Manager</h1>
      <br></br>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form ref={form} onSubmit={sendEmail} style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '5px', width:'55%' ,height:'300px'}}>
        <label style={{ display: 'block' }}>Name</label>
        <input type="text" name="user_name" placeholder="Supply Manager Name ..."style={{ marginBottom: '10px', width: '75%', padding: '5px' }} />
        <label style={{ display: 'block' }}>Email</label>
        <input type="email" name="user_email" placeholder="Enter Email ..." style={{ marginBottom: '10px', width: '75%', padding: '5px' }} />
        <label style={{ display: 'block' }}>Message</label>
        <textarea name="message"  placeholder="Enter Description..."style={{ marginBottom: '10px', width: '75%', padding: '5px' }} /><br></br>
        <input type="submit" value="Send" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} />
      </form>
      </div>
      </center>
    </div>
  );
}

export default Inform;
