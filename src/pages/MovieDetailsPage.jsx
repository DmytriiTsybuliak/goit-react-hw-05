import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getMovieByID } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const location = useLocation();
  // const params = useParams();
  // console.log(params);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieByID(movieID);
        setSelectedMovie(data);
        // setMovieList(data);
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e) {
        setError(true);
        // toast.error(e.message);
        toast.error(e.response.data.status_message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);

  const makeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <div>
      <Toaster />
      <p>Details about {movieID}</p>
      {selectedMovie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt="" />
          <div>
            <h1>{selectedMovie.original_title}</h1>
            <p>{`Vote Average: ${selectedMovie.vote_average.toFixed(1)}`}</p>
            <h2>Overview</h2>
            <p>{selectedMovie.overview}</p>
            <h2>Genres</h2>
            <ul>
              {selectedMovie.genres.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ul>
        <li>
          <NavLink to="cast" className={makeLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={makeLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
