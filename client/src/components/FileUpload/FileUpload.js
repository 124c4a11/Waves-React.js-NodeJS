import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@material-ui/core';


export class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  };

  showUploadedImages = () => {
    return this.state.uploadedFiles.map((item) => (
      <div
        key={ item.public_id }
        onClick={ () => this.onRemove(item.public_id) }
        className="dropzone__item"
        style={{ backgroundImage: `url(${item.url})` }}
      ></div>
    ));
  };

  onDrop = async (files) => {
    this.setState({ uploading: true });

    const config = {
      header: { 'content-type': 'miltipart/form-data' }
    };

    let formData = new FormData();

    formData.append('file', files[0]);

    try {
      const res = await axios.post('/api/users/uploadimage', formData, config);

      this.setState(
        {
          uploading: false,
          uploadedFiles: [
            ...this.state.uploadedFiles,
            res.data
          ]
        },
        () => {
          this.props.onImages(this.state.uploadedFiles);
        }
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  onRemove = async (id) => {
    try {
      await axios.get(`/api/users/removeimage?public_id=${id}`);

      const files = this.state.uploadedFiles.filter((item) => item.public_id !== id);

      this.setState(
        { uploadedFiles: files },
        () => this.props.onImages(files)
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return state = {
        uploadedFiles: []
      };
    }

    return null;
  };

  render() {
    return (
      <Dropzone
        onDrop={ (files) => this.onDrop(files) }
        multiple={ false }
      >
        {
          ({getRootProps, getInputProps}) => (
            <div className="dropzone">
              <div
                {...getRootProps()}
                className="dropzone__item dropzone__item_darken"
              >
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  icon={ faPlusCircle }
                  className="dropzone__centered dropzone__icon"
                />
              </div>

              { this.showUploadedImages() }

              {
                this.state.uploading ?
                  <div className="dropzone__item">
                    <div className="dropzone__centered">
                      <CircularProgress
                        thickness={ 3 }
                        style={{ color: '#999592' }}
                      />
                    </div>
                  </div>
                : null
              }
            </div>
          )
        }
      </Dropzone>
    );
  };
}


export default FileUpload
