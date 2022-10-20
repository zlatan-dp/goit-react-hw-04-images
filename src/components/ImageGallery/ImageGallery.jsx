import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import axios from 'axios';
import css from './ImageGallery.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const PIXABAY_KEY = '29768412-8eb757bc43ab5434ca5a1f8dd';

export class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.page !== this.props.page
    ) {
      axios
        .get(
          `/?key=${PIXABAY_KEY}&q=${this.props.query}&page=${this.props.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          const pictures = res.data.hits;
          this.props.updatePictures(pictures);
        });
    }
  }

  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {this.props.pictures.map(({ id, webformatURL, tags }) => (
            <li className={css.ImageGalleryItem} key={id}>
              <ImageGalleryItem url={webformatURL} tags={tags} />
            </li>
          ))}
        </ul>
        <button
          className={css.Button}
          type="button"
          onClick={this.props.loadMore}
        >
          Load more
        </button>
      </>
    );
  }
}
