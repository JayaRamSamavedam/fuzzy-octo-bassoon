import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import Appbar from './NavBar';

const Posts = () => {
  const [editorContent, setEditorContent] = useState('');
  const [outputContent, setOutputContent] = useState('');
  const User = window.localStorage.getItem('user');
  const token = window.localStorage.getItem('auth_token');

  const contentFieldChanged = (data) => {
    setEditorContent(data);
  };

  // Handle saving the content and update the output content
  const handleSave = () => {
    setOutputContent(editorContent);
  };

  return (
    <div>
      {/* <Appbar /> */}
      {/* Jodit Editor */} 
      <JoditEditor
        value={editorContent}
        onChange={(newContent) => contentFieldChanged(newContent)}
      />
      {/* Save button */}
      <button onClick={handleSave}>Save Content</button>

      {/* Display Content Output */}
      <div className="content-output">
        <h2>Content Output</h2>
        <div dangerouslySetInnerHTML={{ __html: outputContent }}></div>
      </div>
    </div> 
  );
};

export default Posts;
