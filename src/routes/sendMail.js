const { Router } = require("express"); 
const router = Router();
const axios = require("axios");
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

router.post('/', (req, res)=>{

    const { to, subject, html } = req.body;

    console.log('entro')

    // const CLIENT_ID = '1090339452314-a0cmi0ghmef7smtcp3ksnst6od3gv40s.apps.googleusercontent.com';
    // const SECRET = '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';
    const REFRESH = '1//04rMmIvjGhoN_CgYIARAAGAQSNwF-L9Ir2Xm73S0nqor9tb46Cly1tOzPXqWxYk_9Z05U29KIsxM96506VG74eTHQbRfNtQkpCWE';
    const URI = 'https://developers.google.com/oauthplayground';

    
    async function sendEmail(){
        const oAuthClient = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.SECRET,
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
                    clientId:process.env.CLIENT_ID,
                    clientSecret:process.env.SECRET,
                    refreshToken:process.env.REFRESH,
                    accessToken:accessToken
                }
            })
            const mailOptions = {
                from:"Pagina web",
                to:to,
                subject:subject,
                html: html
            };

            const result = await tranporter.sendMail(mailOptions)

            res.send(result)

        } catch (error) {
            console.log(error)
        }
    }
    sendEmail()
})

module.exports = router;