const { Router } = require("express");
const router = Router();
const { initializeApp } = require("firebase-admin/app");
const { db } = require("../firebase");
const { route } = require("./order");

router.get("/", async (req, res) => {
  try {
    const querySnapshot = await db.collection("user").get();
    res.send(
      querySnapshot.docs.map((d) => {
        return {
          id: d.id,
          image: d.data().image,
          firstname: d.data().firstname,
          admin: d.data().admin,
          lastname: d.data().lastname,
          banned: d.data().banned,
          email: d.data().email,
          phone: d.data().phone,
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "ta todo mal che" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("user").doc(req.params.id).get();
    res.send({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.log(err);
    res.send("todo mal -> " + err);
  }
});

router.post("/", async (req, res) => {
  const { lastname, firstname, admin, image, banned, phone, email, password } =
    req.body;
  try {
    await db.collection("user").add({
      lastname,
      firstname,
      image,
      phone,
      email,
      admin,
      banned,
      password,
    });
    res.send("User created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("user").doc(id).delete();
  res.send("user deleted");
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("user").doc(id).update(req.body);
});
router.post("/admin/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("user").doc(id).update(req.body);
  } catch (error) {
      res.status(404).send({error:error.message})
  }
});

module.exports = router;
