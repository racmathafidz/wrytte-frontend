/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import Toolbar from '../utils/toolbar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function WritePostPage() {
  const [selectedImage, setSelectedImage] = useState();
  const [convertedContent, setConvertedContent] = useState(null);
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
  function postHandler(data) {
    console.log(selectedImage);
    console.log(data);
  }

  return (
    <div className="container mx-auto px-52 flex flex-col pt-20 pb-8 font-serif">
      <form onSubmit={handleSubmit(postHandler)}>
        <textarea
          name="title"
          id="title"
          rows="3"
          placeholder="Type your title here..."
          className="resize-none overflow-hidden w-full border-0 text-5xl focus:outline-none"
          {...register('title', { required: true })}
        />
        {
          selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Cover" className="mt-4" />
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
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={Toolbar}
        />
        {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)} /> */}
        <div className="flex flex-row-reverse items-center mt-4">
          <input type="submit" value="Publish" className="cursor-pointer py-2 px-6 bg-black text-gray-100 rounded-lg transform transition duration-300 hover:text-white hover:bg-gray-900" />
          <NavLink to="/" className="mr-4 text-gray-700">Cancel</NavLink>
        </div>
      </form>
    </div>
  );
}
