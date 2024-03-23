import Modal from 'react-modal';
import Loader from '../Loader/Loader';

export default function ImageModal({ modalIsOpen, closeModal, selectedImage, isModalLoading }) {
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      maxWidth: '90%',
      maxHeight: '90%',
      padding: '0px',
      border: 'unset',
      background: 'unset',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, .5)',
      zIndex: 1005,
    },
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {isModalLoading && <Loader />}
        {selectedImage.length != 0 && (
          <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
        )}
      </Modal>
    </>
  );
}
