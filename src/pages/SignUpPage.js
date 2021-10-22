/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import BrandIcon from '../components/BrandIcon/BrandIcon';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import SignUp from '../assets/images/signup.png';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);
  function signUpHandler(data) {
    console.log(data);
  }
  function googleSignUpHandler() {
    console.log('Google Sign Up');
  }

  return (
    <div className="flex flex-row">
      <div className="w-1/2 bg-gray-700">
        <img src={SignUp} alt="Sign Up" className="h-screen object-scale-down" />
      </div>
      <div className="w-1/2 py-11 px-10 flex flex-col">
        <div className="inline-flex">
          <BrandIcon />
        </div>
        <p className="font-sans font-light text-3xl text-gray-900 mt-10 mb-8">Sign Up and Join Wrytte</p>
        <div className="flex flex-col pr-72">
          <GoogleButton googleButtonHandler={googleSignUpHandler} />
        </div>
        <p className="signup-or font-sans font-light text-md text-gray-900 text-center my-8">OR</p>
        <form onSubmit={handleSubmit(signUpHandler)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="auth-label">
                First Name
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="auth-form"
                  {...register('firstName', { required: true })}
                />
                { errors.firstName && errors.firstName.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
              </label>
            </div>
            <div>
              <label htmlFor="lastName" className="auth-label">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="auth-form"
                  {...register('lastName', { required: true })}
                />
                { errors.lastName && errors.lastName.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
              </label>
            </div>
            <div>
              <label htmlFor="email" className="auth-label">
                Email Address
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="auth-form"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
                { errors.email && errors.email.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
                { errors.email && errors.email.type === 'pattern' && (<span className="auth-error">Please fill out with correct email.</span>) }
              </label>
            </div>
            <div>
              <label htmlFor="password" className="auth-label">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="auth-form"
                  {...register('password', { required: true, minLength: 6 })}
                />
                { errors.password && errors.password.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
                { errors.password && errors.password.type === 'minLength' && (<span className="auth-error">Minimal password character is 6.</span>) }
              </label>
            </div>
            <div>
              <input type="submit" value="Sign Up" className="auth-button" />
            </div>
            <div>
              <p className="font-sans font-light text-gray-900 mt-6 ml-1">
                Already have an account?
                {' '}
                <NavLink to="/signin" className="text-blue-900">Sign In</NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
