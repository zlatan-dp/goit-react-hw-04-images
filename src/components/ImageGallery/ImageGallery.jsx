import { Bars } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import css from './ImageGallery.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const PIXABAY_KEY = '29768412-8eb757bc43ab5434ca5a1f8dd';

export const ImageGallery = ({
  query,
  page,
  pictures,
  loadMore,
  updatePictures,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadmore, setLoadmore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true);
    setLoadmore(false);

    axios
      .get(
        `/?key=${PIXABAY_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(res => {
        if (res.data.hits.length === 0) {
          return Promise.reject(new Error(`Нет изображения ${query}`));
        }
        setError(null);
        const picturesData = res.data.hits;

        updatePictures(picturesData);
        picturesData.length === 12 ? setLoadmore(true) : setLoadmore(false);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [query, page]);

  return (
    <>
      <ul className={css.ImageGallery}>
        {!error ? (
          pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li className={css.ImageGalleryItem} key={id}>
              <ImageGalleryItem
                url={webformatURL}
                tags={tags}
                largeUrl={largeImageURL}
              />
            </li>
          ))
        ) : (
          <p>{error.message}</p>
        )}
      </ul>
      {loading && (
        <Bars
          height="60"
          width="60"
          color="#3f51b5"
          ariaLabel="bars-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
          wrapperClass=""
          visible={true}
        />
      )}
      {loadmore && (
        <button className={css.Button} type="button" onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  loadMore: PropTypes.func,
  page: PropTypes.number,
  picctures: PropTypes.arrayOf(PropTypes.shape),
  query: PropTypes.string,
  updatePictures: PropTypes.func,
};
