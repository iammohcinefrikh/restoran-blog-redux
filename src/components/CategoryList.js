import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";
import CategoryItem from "./CategoryItem";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const categoryStatus = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  return (
    <div className="category-list-container">
      <h3 className="category-list-header">Catégories</h3>
      <div className="category-list-items">
        {categories.map((category) => (
          <CategoryItem key={category.id} categoryName={category.categoryName} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;