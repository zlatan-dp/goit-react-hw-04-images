import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ url, tags, largeUrl }) => {
  const [modal, setModal] = useState(false);

  const modalToggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <img
        className={css.ImageGalleryItemImage}
        src={url}
        alt={tags}
        onClick={modalToggle}
      />
      {modal && (
        <Modal largeUrl={largeUrl} alt={tags} modalToggle={modalToggle} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeUrl: PropTypes.string,
  tags: PropTypes.string,
  url: PropTypes.string,
};
