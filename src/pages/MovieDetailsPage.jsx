import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMovieByID } from '../components/api';
import toast, { Toaster } from 'react-hot-toast';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieID } = useParams();
  // const location = useLocation();
  // const params = useParams();
  // console.log(params);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieByID(movieID);
        // setMovieList(data);
        console.log(data.length);
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e) {
        setError(true);
        toast.error(`The resource you requested could not be found.`);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);

  return (
    <div>
      <Toaster />
      <p>Details about {movieID}</p>
    </div>
  );
}
