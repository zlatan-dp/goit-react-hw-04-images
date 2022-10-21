import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

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
    return (
      <>
        <img
          className={css.ImageGalleryItemImage}
          src={this.props.url}
          alt={this.props.tags}
          onClick={this.modalToggle}
        />
        {this.state.modal && (
          <Modal
            largeUrl={this.props.largeUrl}
            alt={this.props.tags}
            modalToggle={this.modalToggle}
          />
        )}
      </>
    );
  }
}
