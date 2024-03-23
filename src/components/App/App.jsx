import { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import { searchImages } from '../api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import './App.css';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchId, setSearchId] = useState('');
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await searchImages(searchQuery, page);
        setGallery(prevImages => {
          return [...prevImages, ...data];
        });
        data.length != 0
          ? toast.success('Success') && setLoadMore(true)
          : toast.error('No results') && setLoadMore(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
        setSearchId('');
      }
    }
    getData();
  }, [page, searchQuery]);

  useEffect(() => {
    if (searchId === '') {
      return;
    }
    try {
      setIsModalLoading(true);
      setError(false);
      gallery.map(item => {
        if (item.id === searchId) {
          setSelectedImage(item);
        }
      });
    } catch (error) {
      setError(true);
    } finally {
      setSearchId('');
      setIsModalLoading(false);
    }
  }, [searchId]);

  const handleSubmit = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = id => {
    setSelectedImage([]);
    setModalIsOpen(true);
    setSearchId(id);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery data={gallery} onClick={openModal} />
      {error && <ErrorMessage />}
      <Toaster />
      {isLoading && <Loader />}
      {loadMore && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedImage={selectedImage}
          isModalLoading={isModalLoading}
        />
      )}
    </div>
  );
}
