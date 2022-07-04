const { Router } = require("express");
const { Category, Product } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDbCategories,getDb } = require("../controllers/index.js");
const { v4: uuidv4 } = require('uuid');

router.get("/", async (req, res) => {
  try {
    const dbCategories = await getDbCategories();
    if (!dbCategories.length) {
      const categoriesApi = await axios(
        `https://api.mercadolibre.com/sites/MLA/search?category=MLA109026`
      );
      const availableFilter =
        categoriesApi.data.available_filters[0].values.map((f) => {
          return {
            id: f.id,
            name: f.name,
          };
        });
      const createdCategories = await Category.bulkCreate(availableFilter);
      res.status(200).send(availableFilter);
    } else {
      res.send(dbCategories)
    }
  } catch (err) {
    console.log(err + " - - Catch en categories");
  }
});

router.get("/:id", async (req, res) => {
try {
  const { id } = req.params;
  const allProducts = await getDb()
  if (id) {
   let found = await allProducts.filter((e)=>e.category?e.category==id:e.category.id==id)
   res.status(200).send(found)
  }else{
    res.status(400).send('error')
  }
} catch (error) {
  console.log(error)
}

  
});

router.post('/', async (req, res) => { // Crear nueva categoría
  const { nameC } = req.body
  console.log(nameC)
  try {
    if (nameC) {
      const id = uuidv4()
      const search = await Category.findOne({
        where: {
          name: nameC
        }
      })
      if (!search) {
        await Category.create({ id: id, name: nameC })
        res.send("Category created")
      } else {
        res.status(404).send("The category already exists")
      }
    }
  } catch (error) {
    console.log(error)
    res.status(404).send(error.message)
  }
})

router.put('/:id', async (req, res) => { // Ruta para cambiar el nombre de una categoría
  const { nameCategory } = req.body
  const { id } = req.params
  try {
    if (nameCategory) {
      const searchDb = await Category.findByPk(id)
      if (searchDb) {
        await searchDb.update({ name: nameCategory })
        res.status(200).send("Updated category")
      } else {
        res.status(404).send("ERROR")
      }
    }
  } catch (error) {
    console.log(error)
  }
})



module.exports = router;
