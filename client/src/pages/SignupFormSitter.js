import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER_PETSITTER } from '../utils/mutations';

function SignupFormSitter(props) {
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [AddPetSitterUser] = useMutation(ADD_USER_PETSITTER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    const mutationResponse = await AddPetSitterUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
        role: "PetSitter"
      },
    });
    const token = mutationResponse.data.addPetSitterUser.token;
    Auth.login(token);
  } catch (e) {
    alert('Failed to sign up!')
    console.error(e);
  };
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="row d-flex justify-content-around p-3 main">
    <Link to="/login-user">← Go to Login</Link>
    <div className="col-10 col-sm-5">
    <h1>Create a Petsitter account</h1>
  <form  onSubmit={handleFormSubmit} className="border rounded-3 p-3 signup-user">
  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Email address</label>
    <input 
    type="email" 
    name='email' 
    required 
    className="form-control email" 
    id="exampleFormControlInput1" 
    placeholder="name@example.com"
    onChange={handleChange} />
  </div>
  <div className="form-group mt-2">
    <label htmlFor="exampleFormControlInput2">Username</label>
    <input 
    type="username" 
    name="username" 
    required 
    className="form-control" 
    id="exampleFormControlInput2" 
    placeholder="Enter your username" 
    onChange={handleChange}/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="exampleFormControlInput2">Password</label>
    <input 
    type="password" 
    name="password" 
    required 
    className="form-control" 
    id="exampleFormControlInput3" 
    placeholder="Enter your password"
    onChange={handleChange} />
  </div>
  <button id='submit-button' type="submit" className="btn btn-secondary mt-2">Submit</button>
</form>
</div>
<img className='col-12 col-sm-6 p-0' id="background-signup" src={require('../images/corgi.jpeg')} alt="background" />
    </div>
    
  )
}


export default SignupFormSitter;