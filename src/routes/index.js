const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



// const options = {
//   method: 'GET',
//   url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
//   params: {limit: '<REQUIRED>'},
//   headers: {
//     'X-RapidAPI-Key': 'fb9d440a17mshdeb12f5ec33d353p1c958bjsn0ce8f2b9c97f',
//     'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com'
//   }
// };



router.get('/sneakers', async (req, res) => {
    // axios.request(options).then(function (response) {
    //     res.status(200).send(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    //     res.status(404)
    // });
    res.send("holliwish")
});


module.exports = router;
