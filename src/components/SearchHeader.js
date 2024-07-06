import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchResultModal from "./SearchResultModal";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const articles = useSelector((state) => state.articles.articles);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const results = articles.filter(article =>
        article.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.articleText.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(results);
      setShowModal(true);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Ressources et Perspectives</h1>
      <p className="search-text">
        Plongez au cœur de la créativité culinaire avec nos dernières actualités du secteur, nos interviews captivantes avec des chefs renommés, les technologies de cuisine de pointe et des ressources inestimables.
      </p>
      <div className="search-input-container">
        <button className="search-button" onClick={handleSearch}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.75 10C4.75 7.10051 7.10051 4.75 10 4.75C12.8995 4.75 15.25 7.10051 15.25 10C15.25 12.8995 12.8995 15.25 10 15.25C7.10051 15.25 4.75 12.8995 4.75 10ZM10 3.25C6.27208 3.25 3.25 6.27208 3.25 10C3.25 13.7279 6.27208 16.75 10 16.75C11.5938 16.75 13.0585 16.1976 14.2133 15.2739L19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L15.2739 14.2133C16.1976 13.0585 16.75 11.5938 16.75 10C16.75 6.27208 13.7279 3.25 10 3.25Z" fill="#767676" /></svg></button>
        <input className="search-input" placeholder="Rechercher" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {showModal && <SearchResultModal articles={filteredArticles} onClose={() => {
        setShowModal(false); setSearchQuery("");
      }} />}
    </div>
  );
};

export default Search;
