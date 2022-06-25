// const { Router } = require("express");
const Router = require("express");
const { Product, Category } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDb , setDataApi } = require("../controllers/index.js");
const { v4: uuidv4 } = require("uuid");
let cargo = false
router.get("/", async (req, res) => {
  const {name}=req.query
  try {
      let result = cargo ? await Product.findAll({include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}}):await setDataApi()
      cargo=true;
      
      // let result = await Product.findAll({include:{model: Category,attributes:["id","name"]}})
      if(name) {
        let filtrado = await Product.findAll({where:{title:{[Op.iLike]:`%${name}%`}},include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}})
        filtrado.length ? res.send(filtrado):res.status(404).send("Product not found")
      }else res.json(result);
  } catch (error) {
    res.status(404).send({error:error.message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const foundProduct = await Product.findByPk(id,{include: { model: Category , attributes:["id","name"],throught:{attributes:[]}}});
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
    const { title, image, brand, model, price, category } = req.body;
    console.log(req.body);
    if (!title || !image || !brand || !model || !price || !category) {
      res.status(404).send("Parameters incomplete");
    } else {
      const id = uuidv4();
      const create = await Product.create({
        id,
        title,
        image,
        brand,
        model,
        price,
      });
      const searchCategory = await Category.findAll({
        where: {
          name: category,
        },
      });

      await create.addCategory(searchCategory);

      res.status(200).send("Product created");
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, brand, model, price } = req.body;
  try {
    // busco el producto
    const product = await Product.findByPk(id);
    //sino esta
    if (!product) res.status(404).send("ID not found");
    //si esta actualizo dependiendo los datos que me ingresan
    product.title = title ? title : product.title;
    product.image = image ? image : product.image;
    product.brand = brand ? brand : product.brand;
    product.model = model ? model : product.model;
    product.price = price ? price : product.price;
    await product.save(); // guardamos los cambios
    res.send("Update");
    //console.log(JSON.stringify(product))
  } catch (error) {
    res.send({ error: error.message });
  }
});

//delete shoes (product)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // elimino el producto
    const removed = await Product.destroy({ where: { id } });
    // si lo de arriba retorna 1 (Es porque lo elimino)
    if (removed) return res.send("Removed product");
    // si lo de arriba retorna 0 (Es porque no lo elimino)
    res.send("ID not found");
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
