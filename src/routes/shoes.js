const { Router } = require("express");
const { Product } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDb } = require("../controllers/index.js");


router.get("/", async (req, res) => {
  try {
    const dbInfo = await getDb();
    if (!dbInfo.length) {
      const shoesApi = await axios(
        `https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=0`
      );
      const result = shoesApi.data.results.map((s) => {
        return {
          id: s.id,
          title: s.title,
          image: s.thumbnail,
          brand: s.attributes ? s.attributes[0].value_name : "Not found",
          model: s.attributes ? s.attributes[2].value_name : "Not found",
          price: s.price,
        };
      });
      const createdInfo = await Product.bulkCreate(result);
      res.send(createdInfo);
    } else {
      const { name } = req.query;
      if (name) {
        const foundShoes = await Product.findAll({
          where: {
            title: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        foundShoes.length
          ? res.status(200).send(foundShoes)
          : res.status(404).send("Sneakers not found");
      } else {
        res.status(200).json(dbInfo);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const foundProduct = await Product.findByPk(id);
      if (foundProduct) {
        res.status(200).send(foundProduct);
      } else {
        res.status(400).json("ID not found");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, image, brand, model, price } = req.query;
    if (!title || !image || !brand || !model || !price) {
      res.status(404).send("Parameters incomplete");
    } else {
      const create = await Product.create({
        where: {
          title,
          image,
          brand,
          model,
          price,
        },
      });
      const createFinish = await addProduct(create);
      res.status(200).send(createFinish);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router