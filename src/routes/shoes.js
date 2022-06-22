const { Router } = require("express");
const { Product, Category } = require("../db");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");
const { getDb } = require("../controllers/index.js");
const { v4: uuidv4 } = require('uuid');

router.get("/", async (req, res) => {
  try {
    const dbInfo = await getDb();
    if (!dbInfo.length) {
      const url = 'https://api.mercadolibre.com/sites/MLA/search?category'
      // const shoesApi = await axios(`https://api.mercadolibre.com/sites/MLA/search?category=MLA109026&offset=50`);
      const first = await axios(`${url}=MLA109027`);
      const second = await axios(`${url}=MLA414251`);
      const third = await axios(`${url}=MLA416005`)
      const fourth = await axios(`${url}=MLA415194`)
      const fifth = await axios(`${url}=MLA414674`)
      const sixth = await axios(`${url}=MLA414610`)
      const seventh = await axios(`${url}=MLA415192`)
      const eighth = await axios(`${url}=MLA414673`)
      const ninth = await axios(`${url}=MLA455893`)
      const tenth = await axios(`${url}=MLA415193`)

      const pages = [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth]

      function conkat(pages) {
        let arry = []
        for (const i of pages) {
          arry.push(i.data.results)
        }
        return arry.flat()
      }
      const total = conkat(pages)

      const result = await Promise.all(
        total.map(async (s) => {
          return {
            id: s.id,
            title: s.title,
            image: s.thumbnail,
            brand: s.attributes ? s.attributes[0].value_name : "Not found",
            model: s.attributes ? s.attributes[2].value_name : "Not found",
            price: s.price,
          }
        })
      )
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
    console.log(error + " ---------------error en shoes.js");
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const dbInfo = await getDb();
//     if (!dbInfo.length) {
//       const shoesApi = await axios(
//         `https://api.mercadolibre.com/sites/MLA/search?category=MLA109026`
//       );
//       const result = shoesApi.data.results.map((s) => {
//         return {
//           id: s.id,
//           title: s.title,
//           image: s.thumbnail,
//           brand: s.attributes ? s.attributes[0].value_name : "Not found",
//           model: s.attributes ? s.attributes[2].value_name : "Not found",
//           price: s.price,
//         };
//       });
//       const createdInfo = await Product.bulkCreate(result);
//       res.send(createdInfo);
//     } else {
//       const { name } = req.query;
//       if (name) {
//         const foundShoes = await Product.findAll({
//           where: {
//             title: {
//               [Op.iLike]: `%${name}%`,
//             },
//           },
//         });
//         foundShoes.length
//           ? res.status(200).send(foundShoes)
//           : res.status(404).send("Sneakers not found");
//       } else {
//         res.status(200).json(dbInfo);
//       }
//     }
//   } catch (error) {
//     console.log(error + " ---------------error en shoes.js");
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const foundProduct = await Product.findByPk(id, {
        include: {
          model: Category
        }
      });
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
    console.log(req.body)
    if (!title || !image || !brand || !model || !price || !category) {
      res.status(404).send("Parameters incomplete");
    } else {
      const id = uuidv4()
      const create = await Product.create({
        id,
        title,
        image,
        brand,
        model,
        price
      });
      const searchCategory = await Category.findAll({
        where: {
          name: category
        }
      })

      await create.addCategory(searchCategory);

      res.status(200).send('Product created');
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
