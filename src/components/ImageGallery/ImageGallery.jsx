import { Bars } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

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
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ loading: true });
      axios
        .get(
          `/?key=${PIXABAY_KEY}&q=${this.props.query}&page=${this.props.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return Promise.reject(
              new Error(`Нет изображения ${this.props.query}`)
            );
          }

          this.setState({ error: null });
          const pictures = res.data.hits;
          this.props.updatePictures(pictures);
          pictures.length === 12
            ? this.setState({ loadMore: true })
            : this.setState({ loadMore: false });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {!this.state.error ? (
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
            <p>{this.state.error.message}</p>
          )}
        </ul>
        {this.state.loading && (
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
        {this.state.loadMore && (
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
