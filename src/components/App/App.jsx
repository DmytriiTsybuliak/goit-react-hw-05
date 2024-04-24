import Navigation from '../Navigation/Navigation';
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import NotFoundPage from '../../pages/NotFoundPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import './App.css';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchId, setSearchId] = useState('');
  // const [gallery, setGallery] = useState([]);
  // const [selectedImage, setSelectedImage] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isModalLoading, setIsModalLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   if (searchId === '') {
  //     return;
  //   }
  //   try {
  //     setIsModalLoading(true);
  //     setError(false);
  //     gallery.map(item => {
  //       if (item.id === searchId) {
  //         setSelectedImage(item);
  //       }
  //     });
  //   } catch (error) {
  //     setError(true);
  //   } finally {
  //     setSearchId('');
  //     setIsModalLoading(false);
  //   }
  // }, [searchId]);

  // const handleSubmit = newQuery => {
  //   setSearchQuery(newQuery);
  //   setPage(1);
  //   setGallery([]);
  // };

  // const handleLoadMore = () => {
  //   setPage(page + 1);
  // };

  // const openModal = id => {
  //   setSelectedImage([]);
  //   setModalIsOpen(true);
  //   setSearchId(id);
  // };
  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieID" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
