import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ largeUrl, alt, modalToggle }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      modalToggle();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      modalToggle();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeUrl} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeUrl: PropTypes.string,
  alt: PropTypes.string,
  modalToggle: PropTypes.func,
};
