const ArticleHeader = ({ articleTitle, articleText, articlePublishingDate }) => {
  return (
    <div className="article-header-container">
      <h1 className="article-title">{articleTitle}</h1>
      <p className="article-text">{articleText}</p>
      <p className="article-publishing-date">{articlePublishingDate}</p>
    </div>
  )
}

export default ArticleHeader;