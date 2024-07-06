import React from "react";
import { useNavigate } from "react-router-dom";

const ArticleResult = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="article-search-card" onClick={handleClick}>
      <h3 className="article-search-card-title">{article.articleTitle}</h3>
      <p className="article-search-card-text">{article.articleText}</p>
    </div>
  );
};

export default ArticleResult;