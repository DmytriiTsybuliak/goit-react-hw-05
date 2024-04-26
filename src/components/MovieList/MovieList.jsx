import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ searchBar = false }) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchBarOption, setSearchBarOption] = useState(searchBar);
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTrendingMovies();
        setMovieList(data);
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {/* {!searchBarOption && <p>Click to Search</p>} */}
      <ul>
        {searchBarOption &&
          movieList.map(item => (
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
