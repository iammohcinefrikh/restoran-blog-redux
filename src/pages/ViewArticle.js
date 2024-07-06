import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticleById, resetCurrentArticle } from "../slices/articleSlice";
import Navbar from "../components/Navbar";
import ArticleHeader from "../components/ArticleHeader";
import ArticleBody from "../components/ArticleBody";

const ViewArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles.currentArticle);
  const articleStatus = useSelector((state) => state.articles.status);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    dispatch(fetchArticleById(id));
    return () => {
      dispatch(resetCurrentArticle());
    };
  }, [dispatch, id]);

  let content;

  if (articleStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (articleStatus === "succeeded" && article) {
    content = (
      <>
        <ArticleHeader articleTitle={article.articleTitle} articleText={article.articleText} articlePublishingDate={article.articlePublishingDate} />
        <ArticleBody articleImage={article.articleImage} articleBody={article.articleBody} />
      </>
    );
  } else if (articleStatus === "failed") {
    content = <p>{error}</p>;
  } else {
    content = <p>Article not found.</p>;
  }

  return (
    <>
      <Navbar />
      {content}
    </>
  );
};

export default ViewArticle;