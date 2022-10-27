import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      toast('Введите запрос', {
        icon: '⏳',
      });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <BsSearch size={26} />
          {/* <span className={css.SearchFormButtonLabel}>Search</span> */}
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
          value={query}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
