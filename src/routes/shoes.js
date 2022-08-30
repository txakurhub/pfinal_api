// const { Router } = require("express");
const Router = require("express");
const { Product, Category } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDb, setDataApi } = require("../controllers/index.js");
let cargo = false
router.get("/", async (req, res) => {
  const { name } = req.query
  try {
    let result = cargo ? await Product.findAll({ include: { all: true } }) : await setDataApi()
    cargo = true;

    // let result = await Product.findAll({include:{model: Category,attributes:["id","name"]}})
    if (name) {
      let filtrado = await Product.findAll({ where: { title: { [Op.iLike]: `%${name}%` } }, include: { all: true } })
      filtrado.length ? res.send(filtrado) : res.status(404).send("Product not found")
    } else res.json(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const foundProduct = await Product.findByPk(id, { include: { all: true } });
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

router.get("/pictures/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pictures = await axios.get("https://api.mercadolibre.com/items/" + id);
    pictures.length ? res.send(pictures.data.pictures.map(r => r.url)) : null;
  } catch (error) {
    console.log(error)
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, image, brand, model, price, category } = req.body;
    console.log(req.body);
    if (!title || !image || !brand || !model || !price || !category) {
      res.status(404).send("Parameters incomplete");
    } else {
      const create = await Product.create({
        id: `MLA${Math.round(Math.random() * 1000000000)}`,
        title,
        image,
        brand,
        model,
        price,
        category,
      });
      const searchCategory = await Category.findOne({
        where: {
          id: category,
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
  const { title, image, brand, model, price, stock } = req.body;
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
    product.stock = stock ? stock : product.stock
    await product.save(); // guardamos los cambios
    res.send("Update");
    //console.log(JSON.stringify(product))
  } catch (error) {
    res.send({ error: error.message });
  }
});

// ruta para actualizar carrito cuando hacen una compra
router.put("/shoppingcart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id)
    if (product) {
      const { sold, stock } = req.body
      if (stock > product.stock) return res.status(404).send("Error la cantidad de productos que intentas comprar excede el stock")
      product.stock = product.stock - stock
      product.sold = product.sold + sold
      await product.save()
      return res.send("La compra se realizó correctamente.")
    }
  } catch (error) {
    res.send({ error: error.message })
  }
})

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
