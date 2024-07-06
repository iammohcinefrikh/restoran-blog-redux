import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";
import { addArticle, fetchArticles } from "../slices/articleSlice";

const ArticleForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const categoryStatus = useSelector((state) => state.categories.status);
  const articles = useSelector((state) => state.articles.articles);

  const [articleTitle, setArticleTitle] = useState("");
  const [articleFeaturedText, setArticleFeaturedText] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articleBodyText, setArticleBodyText] = useState("");
  const [articlePicture, setArticlePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
    dispatch(fetchArticles());
  }, [categoryStatus, dispatch]);

  const handleImageChange = (event) => {
    setArticlePicture(event.target.files[0]);
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", articlePicture);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res = await response.json();
    return res.secure_url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const latestArticleId = articles.length > 0 ? Math.max(...articles.map(article => parseInt(article.id))) : 0;
      const newId = (latestArticleId + 1).toString();

      const date = new Date();
      const formatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
      let formattedDate = formatter.format(date);
      const monthInUppercase = formattedDate.split(' ')[1].charAt(0).toUpperCase() + formattedDate.split(' ')[1].slice(1);
      formattedDate = formattedDate.replace(formattedDate.split(' ')[1], monthInUppercase);

      const newArticle = {
        id: newId,
        articleTitle,
        articleText: articleFeaturedText,
        articleBody: articleBodyText,
        articleImage: imageUrl,
        articleCategory,
        articlePublishingDate: formattedDate,
      };

      await dispatch(addArticle(newArticle));
      setLoading(false);
      alert("Article publié avec succès!");

      setArticleTitle("");
      setArticleFeaturedText("");
      setArticleCategory("");
      setArticleBodyText("");
      setArticlePicture(null);
    } catch (error) {
      setLoading(false);
      alert("Erreur lors du téléchargement de l'image ou de la soumission de l'article:", error);
    }
  };

  return (
    <div className="publish-article-container">
      <h3 className="publish-article-title">Publier un article</h3>
      <form className="publish-article-form" onSubmit={handleSubmit}>
        <label htmlFor="articleTitle">Titre de l'article</label>
        <input
          id="articleTitle"
          type="text"
          placeholder="Titre de l'article"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <label htmlFor="articleFeaturedText">Extrait de l'article</label>
        <input
          id="articleFeaturedText"
          type="text"
          placeholder="Extrait de l'article"
          value={articleFeaturedText}
          onChange={(e) => setArticleFeaturedText(e.target.value)}
        />
        <label htmlFor="articleCategory">Catégorie d'article</label>
        <select
          id="articleCategory"
          value={articleCategory}
          onChange={(e) => setArticleCategory(e.target.value)}
        >
          <option value="" disabled>
            Sélectionner une catégorie...
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <label htmlFor="articleBodyText">Corps de l'article</label>
        <textarea
          id="articleBodyText"
          placeholder="Corps de l'article"
          value={articleBodyText}
          onChange={(e) => setArticleBodyText(e.target.value)}
        ></textarea>
        <label htmlFor="articlePicture">Image de l'article</label>
        <input id="articlePicture" type="file" onChange={handleImageChange} />
        <button type="submit" id="articlePublishButton" disabled={loading}>
          {loading ? "Soumettre..." : "Soumettre"}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;