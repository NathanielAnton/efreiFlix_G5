import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = useCallback((e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Tell everyone what the user typed
    window.dispatchEvent(new CustomEvent('user-search', {
      detail: { searchTerm: newSearchTerm }
    }));
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div className="search-bar-container">
      <div className={`search-bar-wrapper ${isFocused ? 'focused' : ''}`}>
        <span className="search-icon">🔍</span>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Rechercher un film ou une série..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm && (
          <button
            className={`clear-button ${searchTerm ? 'visible' : ''}`}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 