import Modal from 'components/Modal/Modal';
import React, { useState } from 'react';

export default function ImageGalleryItem({ smallImage, largeImage, tags }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <li className="ImageGalleryItem" onClick={toggleModal}>
        <img className="ImageGalleryItem-image" src={smallImage} alt={tags} />
      </li>
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImage} alt="tags" />
        </Modal>
      )}
    </>
  );
}
