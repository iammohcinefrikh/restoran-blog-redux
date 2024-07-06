import React from "react";

const CategoryItem = ({ categoryName }) => {
  return (
    <p className="category-item-container">
      {categoryName}
    </p>
  );
};

export default CategoryItem;