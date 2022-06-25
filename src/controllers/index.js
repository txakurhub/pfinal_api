const { Product, Category } = require("../db");

const getDb = async () => {
  const foundDate = await Product.findAll({include:{model: Category,attributes:["id","name"]}});
  return foundDate;
};

// cargo los productos y creo la relacion a que categoria pertenecen los productos
const cargarDb = async(result)=>{ 
  result.map(async(e)=>{
    const cat = await Category.findByPk(e.category)
    const zapa = await Product.create(e)
    await zapa.addCategory(cat)
    return zapa
  })
} 

const getDbCategories = async () => {
  const foundCategories = await Category.findAll();
  return foundCategories;
};

module.exports = { getDb, getDbCategories,cargarDb };
