import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../slices/articleSlice";

const LatestArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const articleStatus = useSelector((state) => state.articles.status);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    if (articleStatus === "idle") {
      dispatch(fetchArticles());
    }
  }, [articleStatus, dispatch]);

  let content;

  if (articleStatus === "loading") {
    content = <p>Loading...</p>;
  } 
  
  else if (articleStatus === "succeeded") {
    content = articles.slice(-3).reverse().map((article) => (
      <ArticleCard key={article.id} articleId={article.id} articleImage={article.articleImage} articlePublishingDate={article.articlePublishingDate} articleTitle={article.articleTitle} articleText={article.articleText} />
    ));
  }
  
  else if (articleStatus === "failed") {
    content = <p>{error}</p>;
  }
  
  return (
    <div className="latest-articles-container">
      <h3 className="latest-articles-header">Articles récents</h3>
      <div className="latest-articles-cards">
        {content}
      </div>
    </div>
  )
}

export default LatestArticles;