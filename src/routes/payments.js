const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { items, email, user_id } = req.body;

  try {
    const orden = (await axios.post("http://localhost:3001/order", { user_id, email, items })).data;
    const result = await createPayment(items, orden.id);
    res.send(result);
  } catch (error) {
    console.log("Entra aca", error);
    res.status(404).send({ error: error.message });
  }
});

router.get("/success/:id", async (req, res) => {

  const {id} = req.params;

  try {
    await axios.put("http://localhost:3001/order/"+id, {order: "realizada"})
    res.redirect("http://localhost:3000/");
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/failure/:id", async(req, res) => {

  const {id} = req.params;

  try {
    await axios.put("http://localhost:3001/order/"+id, {order: "cancelada"})
    res.redirect("http://localhost:3000/");
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get("/pending/:id", async (req, res) => {

  const {id} = req.params;

  try {
    await axios.put("http://localhost:3001/order/"+id, {order: "pendiente"})
    res.redirect("http://localhost:3000/");
  } catch (error) {
    res.send({ error: error.message });
  }
});

async function createPayment(item, id) {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    items: item,
    back_urls: {
      failure: "http://localhost:3001/payments/failure/"+id,
      pending: "http://localhost:3001/payments/pending/"+id,
      success: "http://localhost:3001/payments/success/"+id,
    }
  };
  const payment = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCES_TOKEN}`,
    },
  });
////ACCES_TOKEN = APP_USR-7186342339590293-051403-1dd7693603cbe79be81d357b18b1a2cc-185162521

    const result = [
      payment.data.init_point,
      payment.data.id,
      payment.data.items.map((e) => {
      return e;
      }),
    ];
    console.log("Esto es payments ", payment);
    return result;
}

module.exports = router;
