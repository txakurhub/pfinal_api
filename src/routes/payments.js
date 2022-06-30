const { Router } = require("express"); 
const router = Router();
const axios = require("axios");
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

router.post("/",async(req,res)=>{
    
    const items = req.body;

    try {
        // const result = await createPayment(items)
        const result = sendEmail()
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
})

router.get("/success", (req, res)=>{
    try{
        res.send("Se completo el pago con exito")
    }catch(error){
        res.send({error:error.message})
    }
})

router.get("/failure", (req, res)=>{
    try{
        res.send("No se puedo completo el pago")
    }catch(error){
        res.send({error:error.message})
    }
})

router.get("/pending", (req, res)=>{
    try{
        res.send("El pago esta pendiente")
    }catch(error){
        res.send({error:error.message})
    }
})

async function createPayment (item){


    const url = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
        items: item,
        back_urls: {
            failure: "localhost:3001/payments/failure",
            pending: "localhost:3001/payments/pending",
            success: "localhost:3001/payments/success"
        }
    }
    const payment = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCES_TOKEN}`
        }
    })

    const result = [payment.data.init_point, payment.data.items.map(e=> {return e})]

    console.log(result)

    return result;

}

    const CLIENT_ID = '1090339452314-a0cmi0ghmef7smtcp3ksnst6od3gv40s.apps.googleusercontent.com';
    const SECRET = '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';
    const REFRESH = '1//04rMmIvjGhoN_CgYIARAAGAQSNwF-L9Ir2Xm73S0nqor9tb46Cly1tOzPXqWxYk_9Z05U29KIsxM96506VG74eTHQbRfNtQkpCWE';
    const URI = 'https://developers.google.com/oauthplayground';

    
        async function sendEmail(){
            const oAuthClient = new google.auth.OAuth2(
                CLIENT_ID,
                SECRET,
                URI
                );
            
                contentHtml= `
                <h1>Hola Thomas</h1>
                <ul>
                    <li>adidas</li>
                    <li>rebook</li>
                    <li>nike</li>
                    <li>pumas</li>
                </ul>
                `
        
            try {

                oAuthClient.setCredentials({ refresh_token : REFRESH});

                const accessToken = await oAuthClient.getAccessToken()
                const tranporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        type:'OAuth2',
                        user:'henrycourse22@gmail.com',
                        clientId:CLIENT_ID,
                        clientSecret:SECRET,
                        refreshToken:REFRESH,
                        accessToken:accessToken
                    }
                })
                const mailOptions = {
                    from:"Pagina web",
                    to:'creatoretomas@gmail.com',
                    subject:'nodemailer prueba',
                    html: contentHtml
                };

                const result = await tranporter.sendMail(mailOptions)

                return result
            } catch (error) {
                console.log(error)
            }
        }

module.exports = router;