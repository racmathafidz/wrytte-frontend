import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Resizer from 'react-image-file-resizer';

import { ActionCreators } from '../../redux/actions';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import encrypt from '../../utils/encrypt';

export default function Settings(props) {
  const { profileData } = props;
  const [selectedImage, setSelectedImage] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch();
  const { SignInAction } = bindActionCreators(ActionCreators, dispatch);
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);
  const imageProfileChange = register('imageProfile');

  function imageChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  }

  const resizeFile = (file) => new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1280,
      1280,
      'JPEG',
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

  const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
  };

  async function saveHandler(data) {
    setIsUpdating(true);
    setIsUpdated(false);
    if (data.imageProfile.length > 0) {
      const resizedImage = await resizeFile(selectedImage);
      const uploadImage = dataURIToBlob(resizedImage);
      const imageForm = new FormData();
      imageForm.append('file', uploadImage, 'file');
      imageUpload(imageForm, data);
    } else {
      profileUpdate(data, undefined);
    }
  }

  function imageUpload(imageForm, data) {
    axios({
      method: 'POST',
      data: imageForm,
      url: `${process.env.REACT_APP_BASE_URL}/picture-upload`,
    }).then(async (res) => {
      profileUpdate(data, res.data.image);
    });
  }

  function profileUpdate(data, imageProfile) {
    axios({
      method: 'PUT',
      data: {
        email: data.email,
        fullName: capitalizeFirstLetter(data.fullName),
        userName: data.userName,
        imageProfile,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/account/${profileData._id}`,
    }).then((response) => {
      const payload = {
        id: response.data._id,
        email: response.data.email,
        fullName: response.data.fullName,
        userName: response.data.userName,
        imageProfile: response.data.imageProfile,
        google: response.data.google,
      };
      SignInAction({
        userData: encrypt(payload),
      });
      setIsUpdating(false);
      setIsUpdated(true);
    });
  }

  return (
    <div className="pb-52">
      {
        isUpdated && (
          <div className="w-full py-4 bg-black text-center text-gray-100">Your profile has been updated</div>
        )
      }
      <div className="container px-4 sm:px-24 lg:px-32 xl:px-80 mt-12 pb-12 flex flex-col font-sans">
        <p className="font-sans font-light text-gray-800 text-4xl mb-10">Account Settings</p>
        <form onSubmit={handleSubmit(saveHandler)}>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-6 items-center">
              <p className="setting-label">Photo</p>
              <label htmlFor="imageProfile">
                <img
                  src={selectedImage ? URL.createObjectURL(selectedImage) : `${profileData.imageProfile}`}
                  alt="Author"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer"
                />
                <div className="absolute flex flex-row inline-flex items-center rounded-md ml-14 -mt-5 pl-2 pr-3 py-1 text-gray-100 bg-black cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <p className="text-sm font-sans font-light"> Edit</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="imageProfile"
                  id="imageProfile"
                  className="hidden h-10"
                  {...imageProfileChange}
                  onChange={(e) => {
                    imageProfileChange.onChange(e);
                    imageChange(e);
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 items-center">
              <p className="setting-label">Full Name</p>
              <input
                type="text"
                name="fullName"
                id="fullName"
                data-testid="fullName"
                className="setting-form"
                defaultValue={profileData.fullName}
                {...register('fullName', { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 items-center">
              <p className="setting-label">Username</p>
              <input
                type="text"
                name="userName"
                id="userName"
                data-testid="userName"
                className="setting-form"
                defaultValue={profileData.userName}
                {...register('userName', { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-6 items-center">
              <p className="setting-label">Email</p>
              <input
                type="text"
                name="email"
                id="email"
                data-testid="email"
                className="setting-form"
                defaultValue={profileData.email}
                {...profileData.password === '' ? 'disabled' : null}
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  ...(profileData.password === '' && { disabled: true }),
                })}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center mt-4">
            {
              isUpdating ? (
                <p className="cursor-wait py-2 px-6 bg-black text-gray-100 rounded-lg">Saving...</p>
              ) : (
                <input type="submit" value="Save" data-testid="save" className="cursor-pointer py-2 px-6 bg-black text-gray-100 rounded-lg transform transition duration-300 hover:text-white hover:bg-gray-900" />
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}
