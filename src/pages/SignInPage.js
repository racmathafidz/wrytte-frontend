import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { useSelector } from 'react-redux';

import BrandIcon from '../components/BrandIcon/BrandIcon';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import SignIn from '../assets/images/signin.png';
import decrypt from '../utils/decrypt';

export default function SignInPage(props) {
  const { AuthGoogle, signInLocal, signInResponse, setSignInResponse } = props;
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  function signInHandler(data) {
    signInLocal(data.email, data.password);
  }

  function googleSignInHandler(googleData) {
    AuthGoogle(googleData);
  }

  useEffect(() => {
    document.title = 'Sign In | Wrytte';
    if (userDataState.userName) {
      history.push(`/${userDataState.userName}`);
    }
    return () => {
      setSignInResponse(null);
    };
  }, [userDataState]);

  return (
    <div className="flex flex-row">
      <div className="w-full xl:w-2/6 py-11 pl-4 sm:pl-10 flex flex-col">
        <div className="inline-flex">
          <BrandIcon />
        </div>
        <p className="font-sans font-light text-3xl text-gray-900 mt-10 mb-8">Sign In To Your Account</p>
        <div className="pr-4 sm:pr-10 xl:pr-24 flex flex-col">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <GoogleButton onClick={renderProps.onClick} />
            )}
            buttonText="Continue with Google"
            onSuccess={googleSignInHandler}
            onFailure={googleSignInHandler}
            cookiePolicy="single_host_origin"
          />
          <p className="w-full signin-or font-sans font-light text-md text-gray-900 text-center my-8 border-b border-gray-300 pt-4">
            <span className="bg-white px-4">OR</span>
          </p>
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
          { signInResponse && (<span className="auth-failed mt-2">{signInResponse}</span>) }
          <p className="font-sans font-light text-center text-gray-900 mt-5">
            Don't have an account?
            {' '}
            <NavLink to="/signup" className="text-blue-900">Sign Up</NavLink>
          </p>
        </div>
      </div>
      <div className="w-0 xl:w-4/6 bg-gray-700">
        <img src={SignIn} alt="Sign In" className="h-screen object-scale-down" />
      </div>
    </div>
  );
}
