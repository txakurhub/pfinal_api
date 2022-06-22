const { Product, Category } = require("../db");

const getDb = async () => {
  const foundDate = await Product.findAll();
  return foundDate;
};

const getDbCategories = async () => {
  const foundCategories = await Category.findAll();
  return foundCategories;
};

module.exports = { getDb, getDbCategories };
