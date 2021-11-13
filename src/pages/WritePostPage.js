/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Toolbar from '../utils/toolbar';
import decrypt from '../utils/decrypt';
import urlTitle from '../utils/urlTitle';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function WritePostPage() {
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState();
  const [convertedContent, setConvertedContent] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const { register, handleSubmit, formState: { errors } } = useForm();
  const imageCoverRegister = register('imageCover', { required: true });
  console.log(errors);

  function imageChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  }

  function removeImage() {
    setSelectedImage();
  }

  function convertContentToHTML() {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  function handleEditorChange(state) {
    setEditorState(state);
    convertContentToHTML();
  }

  // Editor preview
  // function createMarkup(html) {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // }

  function publishHandler(data) {
    setIsPublishing(true);
    const uploadImage = new FormData();
    uploadImage.append('file', selectedImage, 'file');
    imageUpload(uploadImage, data);
  }

  function imageUpload(uploadImage, data) {
    axios({
      method: 'POST',
      data: uploadImage,
      url: `${process.env.REACT_APP_BASE_URL}/picture-upload`,
    }).then(async (res) => {
      publishArticle(data, res.data.image);
    });
  }

  function publishArticle(data, imageCover) {
    const articleBody = convertedContent === null ? '<p></p>' : convertedContent;
    axios({
      method: 'POST',
      data: {
        imageCover,
        articleTitle: data.title,
        articleBody,
        authorId: userDataState.id,
        authorData: userDataState.id,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/article/new-article`,
    }).then((response) => {
      if (response.data.articleTitle) {
        history.push(`/article/${urlTitle(response.data.articleTitle)}`);
      }
    });
  }

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    document.title = 'Write | Wrytte';
    if (!userDataState.userName) {
      history.push('/signup');
    }
  }, []);

  return (
    <div className="container mx-auto px-52 flex flex-col pt-20 pb-8 font-serif">
      <form onSubmit={handleSubmit(publishHandler)}>
        <textarea
          name="title"
          id="title"
          rows="3"
          placeholder="Type your title here..."
          className="resize-none overflow-hidden w-full border-0 text-5xl focus:outline-none"
          {...register('title', { required: true })}
        />
        { errors.title && errors.title.type === 'required' && (<span className="auth-error">Please add title.</span>) }
        {
          selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Cover" className="mt-4 mx-auto" />
          )
        }
        <div className="my-4 flex flex-row">
          <label htmlFor="imageCover" className="cursor-pointer py-2 px-4 border-2 border-gray-400 text-gray-700 rounded-md transform transition duration-300 hover:bg-gray-100">
            {selectedImage ? 'Change' : 'Add Cover Image'}
            <input
              type="file"
              accept="image/*"
              name="imageCover"
              id="imageCover"
              className="hidden"
              {...imageCoverRegister}
              onChange={(e) => {
                imageCoverRegister.onChange(e);
                imageChange(e);
              }}
            />
          </label>
          {
            selectedImage && (<button type="button" onClick={removeImage} className="ml-4 text-red-700">Remove</button>)
          }
        </div>
        { errors.imageCover && errors.imageCover.type === 'required' && (<span className="auth-error">Please add cover image.</span>) }
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={Toolbar}
        />
        {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)} /> */}
        <div className="flex flex-row-reverse items-center my-4">
          {
            isPublishing ? (
              <p className="pt-4">Publishing on progress...</p>
            ) : (
              <>
                <input type="submit" value="Publish" className="cursor-pointer py-2 px-6 bg-black text-gray-100 rounded-lg transform transition duration-300 hover:text-white hover:bg-gray-900" />
                <button type="button" className="mr-4 text-gray-700" onClick={goBack}>Cancel</button>
              </>
            )
          }
        </div>
      </form>
    </div>
  );
}
