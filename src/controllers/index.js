const { Product } = require("../db");


const getDb = async () => {
  const foundDate = await Product.findAll();
  return foundDate;
};

module.exports = getDb ;
