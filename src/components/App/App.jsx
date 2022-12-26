import React, { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getImages } from 'services/image-api';
import LoadMore from 'components/Button/LoadMore';
import { Loader } from 'components/Loader/LoaderImg';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  // Сабміт форми
  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  // Реацілазація функції завантажиння більше зображень
  const loadMore = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    const getImageData = async (imageName, page) => {
      setIsLoading(true);
      try {
        const result = await getImages(imageName, page);
        setImages(images => [...images, ...result.hits]);
        setTotalHits(page < Math.ceil(result.totalHits / 12)); //Перевірка для кнопки loadmore
      } catch (error) {
        alert('Something went wrong');
      }
      setIsLoading(false);
    };

    if (imageName !== '') {
      getImageData(imageName, page);
    }
  }, [imageName, page]);

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} isLoading={isLoading} />
      <ToastContainer autoClose={3000} />
      {!!totalHits &&
        (!isLoading ? <LoadMore onClick={loadMore} /> : <Loader />)}
    </>
  );
}
