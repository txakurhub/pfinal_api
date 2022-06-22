const { Router } = require("express"); 
const router = Router();
const axios = require("axios");



router.get("/",async(req,res)=>{
    
    try {
        const result = await createPayment()
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
})

async function createPayment (req, res){

    const url = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
        items: [
            {
                title: "jabon",
                description: "para bañarse",
                picture_url: "http://www.myapp.com/myimage.jpg",
                category_id: "category234",
                quantity: 1,
                unit_price: 20
            }
        ],
        back_urls: {
            failure: "failure",
            pending: "pending",
            success: "/success"
        }
    }
    const payment = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCES_TOKEN}`
        }
    })
    console.log(payment.data)

    const result = [payment.data.init_point, payment.data.items.map(e=> {return e})]

    return result;

}

module.exports = router;