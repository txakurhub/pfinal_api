const { Router } = require("express");
const { Category } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDbCategories } = require("../controllers/index.js");

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
  const { id } = req.params;
  if (id) {
    const categoriesApi = await axios(
        `https://api.mercadolibre.com/sites/MLA/search?category=${id}`
      );
   const result = categoriesApi.data.results.map(s=>{
    return {
        id: s.id,
        title: s.title,
        image: s.thumbnail,
        brand: s.attributes ? s.attributes[0].value_name : "Not found",
        model: s.attributes ? s.attributes[2].value_name : "Not found",
        price: s.price,
      };
   })
    result.length
      ? res.status(200).send(result)
      : res.status(400).send("Category not found");
  }
});
module.exports = router;
