const { Router } = require("express");
const { Product , Customer,Order} = require("../db");
const router = Router();

// trae todos los customers / customer
router.get("/",async(req,res)=>{
    const {name} = req.query
    try {
        // se trae los customers con su tabla relacional
        let result = await Customer.findAll({include:{model: Order,throught:{attributes:[]}}});
        //busca un filtro de los customers que matcheen con el name que pasan por query 
        if(name) result = result.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
        //sino ingresaron name retorna todos los customers
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
})

//trae por ID
router.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        // se trae el customer con su tabla relacional
        const found = await Customer.findByPk(id,{include:{model: Order,throught:{attributes:[]}}})
        //lo retornamos
        if(found) res.send(found)
        //retornamos el error
        else res.status(404).send("ID not found")
    } catch (error) {
        res.send({error:error.message})
    }
})

// Revisar la Api : id> category_id > short_description

router.post("/",async(req,res)=>{
    const {name,user,password,image,email,phone,address} = req.body
    // const {order} = req.body
    try {
        //se verifica que los campos obligatorios no esten vacio
        if(!name ||!user||!password||!email) return res.status(404).send("These fields cannot be empty: [name,user,password,email]")
        //crea el costumers
        const newCustomer = await Customer.create({
            name,
            user,
            image,
            password,
            email,
            phone,
            default_shipping_address:address
        })
        // const result = await Order.findAll({where:order_id:order}) suponiendo que Order(Modelo) tiene order_id
        //await newCostumer.addOrder(result)
        //
        res.send("User created successfully")
    } catch (error) {
        res.send({error:error.message})
    }
})



module.exports = router;