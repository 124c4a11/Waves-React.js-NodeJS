import React, { Component } from 'react';

import ImageLightBox from '../ImageLightBox';


class ProductGallery extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    const { images } = this.props.detail;

    if (images && images.length) {
      const lightboxImages = images.map((item) => item.url);

      this.setState({ lightboxImages });
    }
  }

  renderImage = (images) => {
    if (images && images.length) {
      return images[0].url;
    }

    return '/images/image_not_availble.png';
  };

  renderThumbs = () => {
    const { brand, name } = this.props.detail;

    return this.state.lightboxImages.map((item, ndx) => (
      ndx > 0 ?
        <li
          key={ ndx }
          className="gallery__list-item"
        >
          <a
            className="gallery__thumb"
            onClick={ (e) => this.onLightBox(e, ndx) }
            style={{ backgroundImage: `url(${item})` }}
            href={ item }
          >
            <span className="visually-hidden">
              { `${brand.name} ${name}` }
            </span>
          </a>
        </li>
      : null
    ));
  };

  onLightBox = (e, ndx) => {
    e.preventDefault();

    if (this.state.lightboxImages.length) {
      this.setState({
        lightbox: true,
        imagePos: ndx
      });
    }
  };

  onLightBoxClose = () => {
    this.setState({ lightbox: false });
  };

  render() {
    const { images, brand, name, id } = this.props.detail;
    const {
      lightboxImages,
      imagePos
    } = this.state;

    return (
      <div className="gallery">
        <a
          onClick={ (e) => this.onLightBox(e, 0) }
          href={ this.renderImage(images) }
          style={{ backgroundImage: `url(${this.renderImage(images)})` }}
          className="gallery__display"
        >
          <span className="visually-hidden">
            { `${brand.name} ${name}` }
          </span>
        </a>
        {
          lightboxImages.length > 1 ?
            <div className="gallery__thumbs">
              <ul className="gallery__thumbs-list">
                { this.renderThumbs() }
              </ul>
            </div>
          : null
        }
        {
          this.state.lightbox ?
            <ImageLightBox
              id={ id }
              images={ lightboxImages }
              pos={ imagePos }
              onClose={ () => this.onLightBoxClose() }
            />
          : null
        }
      </div>
    );
  };
};


export default ProductGallery;
