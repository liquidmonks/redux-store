import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import WebShopingSvg from '../assets/web_shopping.svg'

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto px-2 py-5 min-h-[100vh - 60px]">
      <Link to="/signup" className='link'>← Go to Signup</Link>

      <div className='grid grid-cols-2 h-full gap-4 mt-10'>
        <div className='hidden lg:block'>
          <img src={WebShopingSvg} alt='web shopping' />
        </div>
        <div className='col-span-2 lg:col-span-1'>
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit} className='rounded-md px-3 py-5'>
            <div className="mb-3">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                className='input-primary w-full'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                className='input-primary w-full'
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <button className='btn-primary w-full' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
