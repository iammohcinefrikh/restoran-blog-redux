import { useNavigate } from "react-router-dom";
import openLinkIcon from "../assets/images/open-link.svg";

const ArticleCard = ({ articleId, articleImage, articlePublishingDate, articleTitle, articleText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="article-card-container" onClick={handleClick}>
      <img className="article-card-picture" alt="" src={articleImage} />
      <p className="article-card-publishing-date">{articlePublishingDate}</p>
      <div className="article-card-title">
        <p>{articleTitle}</p>
        <img alt="" src={openLinkIcon} />
      </div>
      <p className="article-card-text">{articleText}</p>
    </div>
  );
};

export default ArticleCard;