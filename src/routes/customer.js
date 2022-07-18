const { Router } = require("express");
const { Product, Customer, Order } = require("../db");
const router = Router();

// trae todos los customers / customer
router.get("/", async (req, res) => {
  const { name } = req.query;
  console.log("aca le llega el name:", name)
  try {
    // se trae los customers con su tabla relacional
    let result = await Customer.findAll({
      include: { model: Order, throught: { attributes: [] } },
    });
    //busca un filtro de los customers que matcheen con el name que pasan por query
    if (name)
      result = result.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
    //sino ingresaron name retorna todos los customers
    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});

//trae por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // se trae el customer con su tabla relacional
    const found = await Customer.findByPk(id, {
      include: { model: Order, throught: { attributes: [] } },
    });
    //lo retornamos
    if (found) res.send(found);
    //retornamos el error
    else res.status(404).send("ID not found");
  } catch (error) {
    res.send({ error: error.message });
  }
});

// crear customers

router.post("/", async (req, res) => {
  const { name, user, password, image, email, phone, address, admin } =
    req.body;
  // const {order} = req.body
  try {
    //se verifica que los campos obligatorios no esten vacio

    if (!name || !user || !password || !email)
      return res
        .status(404)
        .send("These fields cannot be empty: [name,user,password,email]");
    //crea el costumers
    if (await Customer.findByPk(user))
      return res.status(304).send("User is already registered");
    const newCustomer = await Customer.create({
      name,
      user,
      image,
      password,
      email,
      phone,
      is_admin: admin,
      default_shipping_address: address,
    });
    // const result = await Order.findAll({where:order_id:order}) suponiendo que Order(Modelo) tiene order_id
    //await newCostumer.addOrder(result)
    //
    res.send("User created successfully");
  } catch (error) {
    res.send({ error: error.message });
  }
});

//actualizar perfil del customer

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, user, image, email, phone, address, baneado } = req.body;
  try {
    // busco el customer
    const customer = await Customer.findByPk(id);
    //sino esta
    if (!customer) res.status(404).send("ID not found");
    //si esta actualizo dependiendo los datos que me ingresan
    customer.name = name ? name : customer.name;
    customer.user_banned = baneado;
    customer.user = user ? user : customer.user;
    customer.image = image ? image : customer.image;
    customer.email = email ? email : customer.email;
    customer.phone = phone ? phone : customer.phone;
    customer.default_shipping_address = address
      ? address
      : customer.default_shipping_address;
    await customer.save(); // guardamos los cambios
    res.send("Update");
    //console.log(JSON.stringify(customer))
  } catch (error) {
    res.send({ error: error.message });
  }
});

//eliminar customer por ID

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // elimino el producto
    const removed = await Customer.destroy({ where: { id } });
    // si lo de arriba retorna 1 (Es porque lo elimino)
    if (removed) return res.send("Removed customer");
    // si lo de arriba retorna 0 (Es porque no lo elimino)
    res.send("ID not found");
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
