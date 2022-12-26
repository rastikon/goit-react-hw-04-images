import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    if (e.currentTarget.value.toLowerCase() !== imageName) {
      setImageName(e.currentTarget.value.toLowerCase());
    } else console.log(1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Enter something what you want to search');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button className="SearchForm-button" type="submit">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          name="imageName"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </div>
  );
};

// export default class SearchBar extends Component {
//   state = {
//     imageName: '',
//   };

//   handleNameChange = e => {
//     this.setState({ imageName: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     // Заборона выдправки форми з пустим рядяком або не валідного рядка
//     if (this.state.imageName.trim() === '') {
//       toast.error('Введіть в пошуковому полі'); //Вікно про помилку
//       return;
//     }

//     this.props.onSubmit(this.state.imageName);
//     this.setState({ imageName: '' });
//   };

//   render() {
//     return (
//       <div className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button className="SearchForm-button" type="submit">
//             <span className="SearchForm-button-label">Search</span>
//           </button>
//           <input
//             className="SearchForm-input"
//             type="text"
//             name="imageName"
//             // autocomplete="off"
//             // autofocus
//             placeholder="Search images and photos"
//             value={this.state.imageName}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </div>
//     );
//   }
// }
