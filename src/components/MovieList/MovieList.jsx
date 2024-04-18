import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api';
import toast from 'react-hot-toast';

export default function MovieList({ searchBar = false }) {
  const [movieList, setMovieList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchBarOption, setSearchBarOption] = useState(searchBar);

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
      <ul>
        {movieList.map(item => {
          <li key={item.id}>{item.original_title}</li>;
        })}
      </ul>
    </div>
  );
}
