/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import BrandIcon from '../components/BrandIcon';
import GoogleButton from '../components/GoogleButton';
import SignIn from '../assets/images/signin.png';

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);
  function signInHandler(data) {
    console.log(data);
  }
  function googleSignInHandler() {
    console.log('Google Sign In');
  }

  return (
    <div className="flex flex-row">
      <div className="w-2/6 py-11 pl-10 flex flex-col">
        <div className="inline-flex">
          <BrandIcon />
        </div>
        <p className="font-sans font-light text-3xl text-gray-900 mt-10 mb-8">Sign In To Your Account</p>
        <div className="pr-24 flex flex-col">
          <GoogleButton googleButtonHandler={googleSignInHandler} />
          <p className="signin-or font-sans font-light text-md text-gray-900 text-center my-8">OR</p>
          <form onSubmit={handleSubmit(signInHandler)}>
            <label htmlFor="email" className="auth-label">
              Email Address
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                className={errors.email ? 'auth-form' : 'auth-form mb-3'}
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
              { errors.email && errors.email.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
              { errors.email && errors.email.type === 'pattern' && (<span className="auth-error">Please fill out with correct email.</span>) }
            </label>
            <label htmlFor="password" className="auth-label">
              Password
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className={errors.password ? 'auth-form' : 'auth-form mb-3'}
                {...register('password', { required: true, minLength: 6 })}
              />
              { errors.password && errors.password.type === 'required' && (<span className="auth-error">Please fill out this field.</span>) }
              { errors.password && errors.password.type === 'minLength' && (<span className="auth-error">Minimal password character is 6.</span>) }
            </label>
            <input type="submit" value="Sign In" className="auth-button" />
          </form>
          <p className="font-sans font-light text-center text-gray-900 mt-5">
            Don't have an account?
            {' '}
            <NavLink to="/signup" className="text-blue-900">Sign Up</NavLink>
          </p>
        </div>
      </div>
      <div className="w-4/6 bg-gray-700">
        <img src={SignIn} alt="Sign In" />
      </div>
    </div>
  );
}
