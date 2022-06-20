const axios = require('axios');




const getPepes = async()=>{
    const pepes=await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=0&limit=10`)
    const pepePrueba=pepes.data.results.map(e=>e.price);
    const result ={
        // title:pepes.data.results.map(e=>e.title),
        // img:pepes.data.results.map(e=>e.thumbnail),
        brand:pepes.data.results.map(e=>e.attributes[0].value_name),
        // model:pepes.data.results.map(e=>e.attributes[2].value_name),
        // price:pepes.data.results.map(e=>e.price)
    }
    return result
}
module.exports = getPepes;