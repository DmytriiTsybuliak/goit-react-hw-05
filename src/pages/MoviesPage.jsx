import { useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(false);

export default function MoviesPage() {
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log('Done');
  };

  return (
    <div>
      {/* {isLoading && <b>Loading payments...</b>}
      {error && <b>HTTP error!</b>} */}
      <p>Movies Page</p>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
      <MovieList />
    </div>
  );
}
