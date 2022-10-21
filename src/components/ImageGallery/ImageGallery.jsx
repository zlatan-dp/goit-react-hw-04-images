import { Bars } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import css from './ImageGallery.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const PIXABAY_KEY = '29768412-8eb757bc43ab5434ca5a1f8dd';

export class ImageGallery extends Component {
  state = {
    loading: false,
    error: null,
    loadMore: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page, updatePictures } = this.props;
    if (prevProps.query !== query || prevProps.page !== page) {
      this.setState({ loading: true, loadMore: false });
      axios
        .get(
          `/?key=${PIXABAY_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return Promise.reject(new Error(`Нет изображения ${query}`));
          }
          this.setState({ error: null });
          const pictures = res.data.hits;
          updatePictures(pictures);
          pictures.length === 12
            ? this.setState({ loadMore: true })
            : this.setState({ loadMore: false });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { error, loading, loadMore } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {!error ? (
            this.props.pictures.map(
              ({ id, webformatURL, tags, largeImageURL }) => (
                <li className={css.ImageGalleryItem} key={id}>
                  <ImageGalleryItem
                    url={webformatURL}
                    tags={tags}
                    largeUrl={largeImageURL}
                  />
                </li>
              )
            )
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
        {loadMore && (
          <button
            className={css.Button}
            type="button"
            onClick={this.props.loadMore}
          >
            Load more
          </button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  loadMore: PropTypes.func,
  page: PropTypes.number,
  picctures: PropTypes.arrayOf(PropTypes.shape),
  query: PropTypes.string,
  updatePictures: PropTypes.func,
};
