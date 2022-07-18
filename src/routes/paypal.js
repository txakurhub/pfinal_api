const { Router } = require("express");
const { Customer, Order } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
    const { user_id, email, items } = req.body;
    const precio = items.map(r => parseFloat(r.unit_price) * parseFloat(r.quantity)).reduce((a, b) => a + b);
    
    try {
        const date = new Date();
        const found = await Customer.findByPk(user_id);
        const obj = {
            amount: precio, // monto 
            shipping_address: "", // direccion de envio
            order_address: "", // direccion de pedido
            order_email: email,
            order_date: date,
            order_status: "realizada"
        };
        const newOrder = await Order.create(obj);
        newOrder.addCustomer(found);
        items.map(async (item) => await newOrder.addProduct(item.id));
        newOrder.addProduct();
        res.send(newOrder);
    } catch (error) {
        res.status(404).send({ error: error.message });
    };
});

module.exports = router;
