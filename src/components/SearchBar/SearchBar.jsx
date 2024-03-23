import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const { searchField } = form.elements;
    searchField.value !== '' ? onSubmit(searchField.value) : toast.error('Search field is empty');
    searchField.value = '';
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.submitBtn}>
          <IoIosSearch />
        </button>
        <input
          type="text"
          name="searchField"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchField}
        />
      </form>
      <Toaster />
    </header>
  );
}
