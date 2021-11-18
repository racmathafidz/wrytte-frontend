import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { useSelector } from 'react-redux';

import BrandIcon from '../components/BrandIcon/BrandIcon';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import SignUp from '../assets/images/signup.png';
import decrypt from '../utils/decrypt';

export default function SignUpPage(props) {
  const { AuthGoogle, signUpLocal, signUpResponse, setSignUpResponse } = props;
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  function signUpHandler(data) {
    signUpLocal(data.email, data.password, data.firstName, data.lastName);
  }

  function googleSignUpHandler(googleData) {
    AuthGoogle(googleData);
  }

  useEffect(() => {
    document.title = 'Sign Up | Wrytte';
    if (userDataState.userName) {
      history.push(`/${userDataState.userName}`);
    }
    return () => {
      setSignUpResponse(null);
    };
  }, [userDataState]);

  return (
    <div className="flex flex-row">
      <div className="w-0 xl:w-1/2 bg-gray-700">
        <img src={SignUp} alt="Sign Up" className="h-screen object-scale-down" />
      </div>
      <div className="w-full xl:w-1/2 py-11 px-4 sm:px-10 flex flex-col">
        <div className="inline-flex">
          <BrandIcon />
        </div>
        <p className="font-sans font-light text-3xl text-gray-900 mt-10 mb-8">Sign Up and Join Wrytte</p>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <GoogleButton onClick={renderProps.onClick} />
              )}
              buttonText="Continue with Google"
              onSuccess={googleSignUpHandler}
              onFailure={googleSignUpHandler}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
        <p className="w-full signup-or font-sans font-light text-md text-gray-900 text-center my-8 border-b border-gray-300 pt-4">
          <span className="bg-white px-4">OR</span>
        </p>
        <form onSubmit={handleSubmit(signUpHandler)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <p className="font-sans font-light text-gray-900 mt-6 ml-1 text-center sm:text-left">
                Already have an account?
                {' '}
                <NavLink to="/signin" className="text-blue-900">Sign In</NavLink>
              </p>
            </div>
            { signUpResponse && (<span className="auth-failed">{signUpResponse}</span>) }
          </div>
        </form>
      </div>
    </div>
  );
}
