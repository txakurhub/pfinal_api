const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const getPepes = require('../../controllers/hola')
const axios = require('axios');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/shoes', async (req, res) => {

  //--------------------------------------------------------------------------------------------
  const getPepes = async () => {

    const pepes = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=${page}&limit=5`)

    const result = {
      // PruebaLink:pepes.data.results.map(e=>e.seller.permalink),
      // PruebaId:pepes.data.results.map(e=>e.seller.id)
      title: pepes.data.results.map(e => e.title),
      img: pepes.data.results.map(e => e.thumbnail),
      brand: pepes.data.results.map(e => e.attributes[0].value_name),
      model: pepes.data.results.map(e => e.attributes[2].value_name),
      price: pepes.data.results.map(e => e.price)
    }
    return result
  }
  //----------------------------------------------------------------------------------------------

  const page = req.query.page || 0;
  let pepes = await getPepes()
  res.status(200).json(pepes)
});



module.exports = router;
