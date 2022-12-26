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

// export default class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     page: 1,
//     isLoading: false,
//     totalHits: 0,
//   };

//   // передача данних з поля форми
//   handleFormSubmit = imageName => {
//     this.setState({ imageName, images: [], page: 1 });
//   };

//   //Функція завантажит ще зображень
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   //Витягуємо і записуємо дані в state
//   componentDidUpdate(_, prevState) {
//     const { imageName, page } = this.state;

//     // Перевіряю чи рівні теперішній і попередній критерії пошуку
//     if (prevState.imageName !== imageName || prevState.page !== page) {
//       this.setState({ isLoading: true });

//       getImages(imageName, page)
//         .then(data => {
//           this.setState(prev => ({
//             images: [...prev.images, ...data.hits], // Записуємо масив в images
//             totalHits: this.state.page < Math.ceil(data.totalHits / 12), //Записуємо кількість знайдених фотографій
//             // page === 1
//             //   ? data.totalHits - data.hits.length
//             //   : data.totalHits - [...prev.images, ...data.hits].length, //Записуємо кількість знайдених фотографій
//           }));
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   render() {
//     const { images, isLoading, totalHits } = this.state;
//     return (
//       <>
//         <SearchBar onSubmit={handleFormSubmit} />
//         <ImageGallery images={images} isLoading={isLoading} />
//         <ToastContainer autoClose={3000} />
//         {!!totalHits &&
//           (!isLoading ? <LoadMore onClick={this.loadMore} /> : <Loader />)}
//       </>
//     );
//   }
// }
