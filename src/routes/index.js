const { Router } = require('express');

const axios = require('axios');
const { Product } = require('../db');
const router = Router();

const getDb = async () => {

  const foundDate = await Product.findAll()

  return foundDate
}

router.get('/shoes', async (req, res) => {
  //--------------------------------------------------------------------------------------------
  try {
    const dbInfo = await getDb()
    if (!dbInfo.length) {
      const shoesApi = await axios(`https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=0`)
      const result = shoesApi.data.results.map(s => {
        return {
          title: s.title,
          image: s.thumbnail,
          brand: s.attributes ? s.attributes[0].value_name : "Not found",
          model: s.attributes ? s.attributes[2].value_name : "Not found",
          price: s.price
        }
      })
      const createdInfo = await Product.bulkCreate(result)
      res.send(createdInfo)
    } else {
      res.status(200).json(dbInfo)
    }
  } catch (error) {
    console.log(error)
  }
})




module.exports = router;
