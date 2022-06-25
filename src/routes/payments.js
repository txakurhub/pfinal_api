const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { items, email, user_id } = req.body;

  try {
    const result = await createPayment(items);
    await axios.post("http://localhost:3001/order",{user_id , email , items})
    res.send(result);
  } catch (error) {
    console.log("Entra aca", error)
    res.status(404).send({ error: error.message });
  }
});

router.get("/success", (req, res) => {
  try {
    res.send("Se completo el pago con exito");
  } catch (error) {
    res.send({ error: error.message }); 
  }
});

router.get("/failure", (req, res) => {
  try {
    res.send("No se pudo completar el pago");
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/pending", (req, res) => {
  try {
    res.send("El pago esta pendiente");
  } catch (error) {
    res.send({ error: error.message });
  }
});

async function createPayment(item) {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    items: item,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
    },
  };
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer TEST-2737431016395980-062500-c992f2fbd8706f90ef0a3ed2c9a88b9b-296800993`,
    },
  });

  const result = [
    payment.data.init_point,
    payment.data.items.map((e) => {
      return e;
    }),
  ];
  console.log("Es result ",result)
  return result;
}

module.exports = router;
