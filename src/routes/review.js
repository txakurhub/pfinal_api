const { Router } = require("express");
const { Product, Review } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
    const { comment, calification, userid, productid } = req.body
    if (!comment || !calification || !userid || !productid) {
        res.status(404).send("Parameters incomplete");
    } else {
        console.log(productid)
        const create = await Review.create({
            comment,
            calification,
            userId: userid,
            ProductId: productid
        })
        const result = await Review.findAll({
            where: {
                ProductId: productid
            },

        })
        res.status(200).send(result);
    }
})
router.get("/:id", async (req, res) => {
    const { id } = req.params
    const result = await Review.findAll({
        where: {
            ProductId: id
        }, 
    })
    res.status(200).send(result)
})


module.exports = router;

