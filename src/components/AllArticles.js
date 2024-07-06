import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../slices/articleSlice";

const AllArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articleStatus = useSelector((state) => state.articles.status);
  const error = useSelector((state) => state.articles.error);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    if (articleStatus === "idle") {
      dispatch(fetchArticles());
    }
  }, [articleStatus, dispatch]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil((articles.length - 3) / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  let content;

  if (articleStatus === "loading") {
    content = <p>Loading...</p>;
  } 
  
  else if (articleStatus === "succeeded") {
    const filteredArticles = articles.slice(0, -3).reverse();
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = filteredArticles.slice(startIndex, endIndex);
    
    content = currentArticles.map((article) => (
      <ArticleCard key={article.id} articleId={article.id} articleImage={article.articleImage} articlePublishingDate={article.articlePublishingDate} articleTitle={article.articleTitle} articleText={article.articleText} />
    ));
  }
  
  else if (articleStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="all-articles-container">
      <h3 className="all-articles-header">Tous les articles</h3>
      <div className="all-articles-cards">
        {content}
      </div>
      <div className="all-articles-pagination-container">
        <button className={currentPage === 1 ? "previous-button disabled-button" : "previous-button"} onClick={handlePreviousPage} disabled={currentPage === 1}><svg className="previous-button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 10.0001H4.16666M4.16666 10.0001L10 15.8334M4.16666 10.0001L10 4.16675" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>Précédent</button>
        <p className="pagination-index">
          Page {currentPage} sur {Math.ceil((articles.length - 3) / articlesPerPage)}
        </p>
        <button className={currentPage >= Math.ceil((articles.length - 3) / articlesPerPage) ? "next-button disabled-button" : "next-button"} onClick={handleNextPage} disabled={currentPage >= Math.ceil((articles.length - 3) / articlesPerPage)}>Suivant<svg className="next-button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
  );
};

export default AllArticles;