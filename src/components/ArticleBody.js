const ArticleBody = ({ articleImage, articleBody}) => {
  const paragraphs = articleBody.split("\n");

  return (
    <div className="article-body-container">
      <img className="article-picture" alt="" src={articleImage} />
      <div className="article-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="article-paragraph">{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default ArticleBody;