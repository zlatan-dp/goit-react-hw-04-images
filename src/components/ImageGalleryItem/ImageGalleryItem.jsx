import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  modalToggle = () => {
    this.setState(state => ({
      modal: !state.modal,
    }));
  };

  render() {
    const { url, tags, largeUrl } = this.props;
    return (
      <>
        <img
          className={css.ImageGalleryItemImage}
          src={url}
          alt={tags}
          onClick={this.modalToggle}
        />
        {this.state.modal && (
          <Modal
            largeUrl={largeUrl}
            alt={tags}
            modalToggle={this.modalToggle}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeUrl: PropTypes.string,
  tags: PropTypes.string,
  url: PropTypes.string,
};
