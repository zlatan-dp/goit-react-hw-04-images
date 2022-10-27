import { useState } from 'react';
// import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const updatePictures = newPictures => {
    setPictures(prevState => [...prevState, ...newPictures]);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        query={query}
        page={page}
        pictures={pictures}
        loadMore={loadMore}
        updatePictures={updatePictures}
      />
      <Toaster />
    </div>
  );
};

/* export class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
  };

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1, pictures: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  updatePictures = pictures => {
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...pictures],
    }));
  };

  render() {
    const { query, page, pictures } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={query}
          page={page}
          pictures={pictures}
          loadMore={this.loadMore}
          updatePictures={this.updatePictures}
        />
        <Toaster />
      </div>
    );
  }
} */
