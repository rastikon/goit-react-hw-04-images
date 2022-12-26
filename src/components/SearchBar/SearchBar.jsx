import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    if (e.currentTarget.value.toLowerCase() !== imageName) {
      setImageName(e.currentTarget.value.toLowerCase());
    }
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
