import React from "react";
import ArticleSearchCard from "./ArticleSearchCard";

const SearchResultModal = ({ articles, onClose }) => {
  const content = articles.map((article) => (
    <ArticleSearchCard key={article.id} article={article} />
  ));
  
  return (
  <div className="search-result-modal-container">
    <div className="search-result-modal-items">
      <h3 className="search-result-modal-title">Résultats de la recherche</h3>
      {articles.length > 0 ? content : <p className="search-result-modal-error">Aucun résultat trouvé.</p>}
      <button className="search-result-modal-close-button" onClick={onClose}>Fermer</button>
    </div>
  </div>
  )
};

export default SearchResultModal;