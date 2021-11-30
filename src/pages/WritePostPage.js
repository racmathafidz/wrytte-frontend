import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

import { ActionCreators } from '../redux/actions';
import Toolbar from '../utils/toolbar';
import decrypt from '../utils/decrypt';
import urlTitle from '../utils/urlTitle';
import sendEmail from '../utils/sendEmail';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function WritePostPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { SignOutAction } = bindActionCreators(ActionCreators, dispatch);
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const [rows, setRows] = useState(3);
  const [profileData, setProfileData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [convertedContent, setConvertedContent] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dataForm, setDataForm] = useState();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const { register, handleSubmit, formState: { errors } } = useForm();
  const titleRegister = register('title', { required: true });
  const imageCoverRegister = register('imageCover', { required: true });
  console.log(errors);

  function titleChange(event) {
    const textareaLineHeight = window.innerWidth < 1024 ? 45 : 48;
    const minRows = 3;
    const maxRows = 10;

    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = (event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  }

  function imageChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  }

  function removeImage() {
    setSelectedImage();
  }

  function convertContentToHTML() {
    const currentContentAsHTML = convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'PARAGRAPH') {
          return <p />;
        }
        if (block.type === 'code') {
          return <code>{block.text}</code>;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url} target="_blank" style={{ textDecorationLine: 'underline' }} rel="noreferrer">{originalText}</a>;
        }
        if (entity.type === 'IMAGE') {
          return `<img src="${entity.data.src}" />`;
        }
        return originalText;
      },
    })(editorState.getCurrentContent());
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

  async function getUserData(data) {
    setIsPublishing(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/account/${userDataState.userName}`)
      .then((response) => {
        if (response.data.msg) {
          SignOutAction();
          history.push('/signup');
        }
        if (response.data.profileData) {
          setDataForm(title);
          setProfileData(response.data);
          publishHandler(data);
        }
      });
  }

  async function publishHandler(data) {
    const resizedImage = await resizeFile(selectedImage);
    const uploadImage = dataURIToBlob(resizedImage);
    const imageForm = new FormData();
    imageForm.append('file', uploadImage, 'file');
    imageUpload(data, imageForm);
  }

  function imageUpload(data, imageForm) {
    axios({
      method: 'POST',
      data: imageForm,
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
        authorId: profileData.profileData._id,
        authorData: profileData.profileData._id,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/article/new-article`,
    }).then((response) => {
      if (response.data.articleTitle) {
        history.push(`/article/${urlTitle(response.data.articleTitle)}-${response.data._id}`);
        sendEmail(`/article/${urlTitle(response.data.articleTitle)}`);
      }
    });
  }

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/account/${userDataState.userName}`)
      .then((response) => {
        if (response.data.msg) {
          SignOutAction();
          history.push('/signup');
        }
        if (response.data.profileData) {
          setProfileData(response.data);
        }
      });
  }, []);

  useEffect(() => {
    document.title = 'Write | Wrytte';
    if (!userDataState.userName) {
      history.push('/signup');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-20 lg:px-32 xl:px-52 flex flex-col pt-12 sm:pt-16 xl:pt-20 pb-8 font-serif">
      <form onSubmit={handleSubmit(getUserData)}>
        <textarea
          name="title"
          id="title"
          rows={rows}
          placeholder="Type your title here..."
          className="resize-none overflow-hidden w-full border-0 text-4xl lg:text-5xl leading-tight focus:outline-none"
          {...titleRegister}
          onChange={(e) => {
            titleRegister.onChange(e);
            titleChange(e);
          }}
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
              <p className="cursor-wait py-2 px-6 bg-black text-gray-100 rounded-lg">Publishing on progress...</p>
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
