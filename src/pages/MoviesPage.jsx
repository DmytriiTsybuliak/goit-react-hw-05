import { useEffect, useRef, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(false);
import css from './MoviesPage.module.css';
import toast from 'react-hot-toast';
import { searchMovieQuery } from '../components/api';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { query } = useParams();
  console.log(location.state); // "/dashboard?name=hoodie"
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchMovieQuery(searchQuery);
        setFilteredList(data);
        // setMovieList(data);
        // data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e) {
        setError(true);
        // toast.error(e.message);
        toast.error(e.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchQuery]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const { searchField } = form.elements;
    searchField.value !== ''
      ? setSearchQuery(searchField.value)
      : toast.error('Search field is empty');
    searchField.value = '';
  };

  return (
    <div>
      {/* {isLoading && <b>Loading payments...</b>}
      {error && <b>HTTP error!</b>} */}
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="searchField"
          placeholder="Search movies"
          className={css.searchText}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <MovieList /> */}
      <ul>
        {filteredList.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
