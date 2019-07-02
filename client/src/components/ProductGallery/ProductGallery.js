import React, { Component } from 'react';


export class ProductGallery extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    const { images } = this.props.detail;

    if (images && images.length) {
      this.setState({ lightboxImages: [ ...images ] });
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
          key={ item.public_id }
               className="gallery__list-item"
        >
          <a
            className="gallery__thumb"
            onClick={ (e) => this.onLightBox(e, ndx) }
            style={{ backgroundImage: `url(${item.url})` }}
            href={ item.url }
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
    console.log('onLightBox');
  };

  render() {
    const { images, brand, name } = this.props.detail;
    const { lightboxImages } = this.state;

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
            <div className="gallery__thubms">
              <ul className="gallery__thumbs-list">
                { this.renderThumbs() }
              </ul>
            </div>
          : null
        }
      </div>
    );
  };
};


export default ProductGallery;
