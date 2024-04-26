import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieByID } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const backLinkRef = useRef(location.state ?? '/');

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
      <Link to={backLinkRef.current}>Back to Home</Link>
      <Toaster />
      {selectedMovie && (
        <div className={css.container}>
          <img
            src={`https://image.tmdb.org/t/p/w400/${selectedMovie.poster_path}`}
            alt={selectedMovie.original_title}
          />
          <div className={css.description}>
            <h1>{selectedMovie.original_title}</h1>
            <p>{`Vote Average: ${selectedMovie.vote_average.toFixed(1)}`}</p>
            <h2>Overview</h2>
            <p>{selectedMovie.overview}</p>
            <h2>Genres</h2>
            <ul className={css.list}>
              {selectedMovie.genres.map(item => (
                <li className={css.list__item} key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <h2>Additional information</h2>
      <ul className={css.add_info_list}>
        <li className={css.add_info_item}>
          <NavLink to="cast" className={makeLinkClass}>
            Cast
          </NavLink>
        </li>
        <li className={css.add_info_item}>
          <NavLink to="reviews" className={makeLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
