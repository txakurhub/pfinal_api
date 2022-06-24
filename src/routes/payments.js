const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const items = req.body;

  try {
    const result = await createPayment(items);
    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
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
    res.send("No se puedo completo el pago");
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
      Authorization: `Bearer ${process.env.ACCES_TOKEN}`,
    },
  });

  const result = [
    payment.data.init_point,
    payment.data.items.map((e) => {
      return e;
    }),
  ];

  console.log(payment);

  return result;
}

module.exports = router;
