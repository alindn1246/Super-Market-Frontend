import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(
        'https://localhost:7211/api/auth/register',
        {
          email,
          name,
          phoneNumber,
          password
        }
      );

      const responseRole = await axios.post(
        'https://localhost:7211/api/auth/AssignRole',
        {
          email,
          name,
          phoneNumber,
          password,
          role
        }
      );
      
     
      console.log('Registration successful:', response.data);
      console.log('Registration Role successful:', responseRole.data);
      navigate('/LogIn');
    } catch (error) {
     
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <Container fluid className="mt-4">
      <div className="row text-center p-3">
        <h1>Register</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className='mb-3'>
          <Form.Control 
            type="email" 
            placeholder="Email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {/* Validation error message for email */}
        </Form.Group>

        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Control 
            type="text" 
            placeholder="Name..." 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {/* Validation error message for name */}
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber" className='mb-3'>
          <Form.Control 
            type="tel" 
            placeholder="Phone Number..." 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
          {/* Validation error message for phone number */}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Control 
            type="password" 
            placeholder="Password..." 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {/* Validation error message for password */}
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
        
        
      </Form>
    </Container>
  );
};

export default RegistrationForm;
