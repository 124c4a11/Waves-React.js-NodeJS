import React, { Component } from 'react';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class ImageLightBox extends Component {
  state = {
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images.length) {
      return state = {
        images: [ ...props.images ]
      };
    }

    return false;
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    const {
      currentImage,
      images
    } = this.state;

    return (
      <Lightbox
        mainSrc={ images[currentImage] }
        nextSrc={ images[(currentImage + 1) % images.length] }
        prevSrc={ images[(currentImage + images.length - 1) % images.length] }
        onMovePrevRequest={ () =>
          this.setState({
            currentImage: (currentImage + images.length - 1) % images.length,
          })
        }
        onMoveNextRequest={ () =>
          this.setState({
            currentImage: (currentImage + 1) % images.length,
          })
        }
        onCloseRequest={ () => this.onClose() }
      />
    );
  };
};


export default ImageLightBox;
