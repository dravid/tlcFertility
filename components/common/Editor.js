import React, { Component } from 'react';
import { Card } from 'antd';

// import { ImageResize } from 'quill-image-resize-module';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }


    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnChange(html, delta, source) {
    const { onChange } = this.props;

    if (source === 'user') {
      onChange(html);
    }
  }

  handleOnBlur(range, source, quill) {
    const { onBlur } = this.props;

    if (source === 'user') {
      onBlur(quill.getHTML());
    }
  }
  render() {

    const { value } = this.props;
    const ReactQuill = this.ReactQuill
    if (typeof window !== 'undefined' && ReactQuill) {
      return (

        <div>
          <ReactQuill
            style={{ height: '350px' }}
            value={value}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            modules={Editor.modules}
            formats={Editor.formats}
            theme="snow"
          />
        </div>

      )
    } else {
      return <textarea />;
    }
  }
}


export default Editor;

Editor.modules = {
  //   imageUpload: {
  //     url: '../static/images', // server url. If the url is empty then the base64 returns
  //     method: 'POST', // change query method, default 'POST'
  //     name: 'image', // custom form name
  //     withCredentials: false, // withCredentials
  //     headers: {
  //       Authorization: 'Client-ID <IMGUR API CLIENTID>',
  //     },
  //     // personalize successful callback and call next function to insert new url to the editor
  //     callbackOK: (serverResponse, next) => {
  //       next(serverResponse.data.link);
  //     },
  //     // personalize failed callback
  //     callbackKO: serverError => {
  //       alert(serverError);
  //     },
  //     // optional
  //     // add callback when a image have been chosen
  //     checkBeforeSend: (file, next) => {
  //       console.log(file);
  //       next(file); // go back to component and send to the server
  //     }
  //   },
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
