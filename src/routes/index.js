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
const getShoes = async()=>{
    const shoes=await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=calzado&offset=${page}&limit=5`)

    const result ={
        // PruebaLink:pepes.data.results.map(e=>e.seller.permalink),
        // PruebaId:pepes.data.results.map(e=>e.seller.id)
        title:shoes.data.results.map(e=>e.title),
        img:shoes.data.results.map(e=>e.thumbnail),
        brand:shoes.data.results.map(e=>e.attributes[0].value_name),
        model:shoes.data.results.map(e=>e.attributes[2].value_name),
        price:shoes.data.results.map(e=>e.price)
    }
    return result
}
//----------------------------------------------------------------------------------------------

    const page=req.query.page||0;
    let shoes = await getShoes()
    res.json(shoes)
});



module.exports = router;
