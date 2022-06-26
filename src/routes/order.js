const { Router } = require("express");
const { Customer, Order } = require("../db");
const router = Router();

router.get("/",async (req,res)=>{
    try {
        const result = await Order.findAll({include:{model: Customer,throught:{attributes:[]}}})
        res.send(result)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
})
 
router.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const found = await Order.findByPk(id,{include:{model: Customer,throught:{attributes:[]}}})
        if(found) res.send(found)
        else res.status(404).send("ID not found")
    } catch (error) {
        res.send({error:error.message}) 
    }
})

router.post("/", async (req,res)=>{
    const {user_id , email , items} = req.body
    const precio = items.map(e=>parseFloat(e.unit_price)*parseFloat(e.quantity)).reduce((a,b)=>a+b)
    try {
        const date = new Date()
        const found = await Customer.findByPk(user_id)
        const obj = {
            amount:precio, // monto 
            shipping_address:"", // direccion de envio
            order_address:"", // direccion de pedido
            order_email:email,
            order_date:date,
            order_status:"pendiente"
        }
        const newOrder = await Order.create(obj)
        newOrder.addCustomer(found)
        res.send(newOrder)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}) 

module.exports = router;