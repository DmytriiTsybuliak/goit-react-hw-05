import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ filtered }) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setMovieList([]);
        setError(false);
        if (!filtered) {
          const data = await getTrendingMovies();
          data.length != 0 ? toast.success('Success') : toast.error('No results');
          setMovieList(data);
        } else {
          setMovieList(filtered);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [filtered]);

  return (
    <div>
      {isLoading && <b>Loading moviews...</b>}
      {error && <b>HTTP error!</b>}
      <Toaster />
      <ul>
        {movieList.map(item => (
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
