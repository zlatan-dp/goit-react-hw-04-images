import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, tags }) => {
  return <img className={css.ImageGalleryItemImage} src={url} alt={tags} />;
};
