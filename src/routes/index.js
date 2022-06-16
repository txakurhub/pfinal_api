const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPepes = async()=>{
    const pepes=await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=zapatillas')
    const pepePrueba=pepes.data.results.map(e=>e.price);
    const result ={
        title:pepes.data.results.map(e=>e.title),
        img:pepes.data.results.map(e=>e.thumbnail),
        brand:pepes.data.results.map(e=>e.attributes[0].value_name),
        model:pepes.data.results.map(e=>e.attributes[2].value_name),
        price:pepes.data.results.map(e=>e.price)
    }
    return result
}


router.get('/sneakers', async (req, res) => {
    let pepes = await getPepes()

    res.json(pepes)
});



module.exports = router;
