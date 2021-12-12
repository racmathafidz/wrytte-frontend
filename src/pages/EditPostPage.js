import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import { stateFromHTML } from 'draft-js-import-html';
// import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';

import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import Toolbar from '../utils/toolbar';
import decrypt from '../utils/decrypt';
import urlTitle from '../utils/urlTitle';
import sendEmail from '../utils/sendEmail';
import getArticleId from '../utils/getArticleId';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function EditPostPage() {
  const { articleTitle } = useParams();
  const history = useHistory();
  const encryptedState = useSelector((state) => state);
  const userDataState = encryptedState.UserData.userData ? decrypt(encryptedState.UserData.userData) : encryptedState.UserData;
  const [rows, setRows] = useState(3);
  const [articleData, setArticleData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [convertedContent, setConvertedContent] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [editorState, setEditorState] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const titleRegister = register('title', { required: true });
  const imageCoverRegister = register('imageCover');
  console.log(errors);

  function titleChange(event) {
    const textareaLineHeight = window.innerWidth < 1024 ? 45 : 48;
    const minRows = 3;
    const maxRows = 6;

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

  function setEditorValue(value) {
    setEditorState(() => EditorState.createWithContent(stateFromHTML(value)));
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

  async function publishHandler(data) {
    setIsPublishing(true);
    if (data.imageCover.length > 0) {
      const resizedImage = await resizeFile(selectedImage);
      const uploadImage = dataURIToBlob(resizedImage);
      const imageForm = new FormData();
      imageForm.append('file', uploadImage, 'file');
      imageUpload(imageForm, data);
    } else {
      EditArticle(data, undefined);
    }
  }

  function imageUpload(imageForm, data) {
    axios({
      method: 'POST',
      data: imageForm,
      url: `${process.env.REACT_APP_BASE_URL}/picture-upload`,
    }).then(async (res) => {
      EditArticle(data, res.data.image);
    });
  }

  function EditArticle(data, imageCover) {
    const articleBody = convertedContent === null ? articleData.articleBody : convertedContent;
    axios({
      method: 'PUT',
      data: {
        imageCover,
        articleTitle: data.title,
        articleBody,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/api/article/edit/${articleData._id}`,
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
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/article/${getArticleId(articleTitle)}`)
      .then((response) => {
        if (response.data.msg) {
          setArticleData(null);
        }
        if (response.data.articleTitle) {
          setArticleData(response.data);
          setEditorValue(response.data.articleBody);
        }
      });
  }, [articleTitle]);

  useEffect(() => {
    document.title = 'Edit | Wrytte';
    if (!userDataState.userName) {
      history.push('/signup');
    }
  }, []);

  if (articleData) {
    if (articleData.authorData._id !== userDataState.id) {
      return (
        <NotFoundPage />
      );
    }

    return (
      <div className="container mx-auto px-4 sm:px-20 lg:px-32 xl:px-52 flex flex-col pt-12 sm:pt-16 xl:pt-20 pb-8 font-serif">
        <form onSubmit={handleSubmit(publishHandler)}>
          <textarea
            name="title"
            id="title"
            rows={rows}
            defaultValue={articleData.articleTitle}
            placeholder="Type your title here..."
            className="resize-none overflow-hidden w-full border-0 text-4xl lg:text-5xl leading-tight focus:outline-none"
            {...titleRegister}
            onChange={(e) => {
              titleRegister.onChange(e);
              titleChange(e);
            }}
          />
          { errors.title && errors.title.type === 'required' && (<span className="auth-error">Please add title.</span>) }
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : articleData.imageCover}
            alt="Cover"
            className="mt-4 mx-auto"
          />
          <div className="my-4 flex flex-row">
            <label htmlFor="imageCover" className="cursor-pointer py-2 px-4 border-2 border-gray-400 text-gray-700 rounded-md transform transition duration-300 hover:bg-gray-100">
              {selectedImage ? 'Change' : 'Edit Cover Image'}
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

  if (articleData === null) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <LoadingPage />
  );
}
