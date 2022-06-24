const { Router } = require("express");
const { Product ,Wishlist, wishlist_product} = require("../db");
const router = Router();

router.post("/", async(req, res)=>{
try {
    const {user_id, product_id} = req.body
    if(!user_id || !product_id){
        res.status(404).send("Parameters incompletes")
    }else{
        const create = await Wishlist.create({
            userId: user_id 
        });
        const searchProduct = await Product.findByPk(product_id);
        await create.addProduct(searchProduct);
        res.status(200).send('Wishlist create');
    }
} catch (error) {
    console.log(error)
}
})
router.get("/:id", async(req, res)=>{
    const {id} = req.params
    console.log(id)
    const result = await Wishlist.findAll({
        where: {
            userId: id
        },
        include: Product
    })
    console.log(result)
    res.status(200).send(result)
})
router.delete("/:id", async(req, res)=>{
    const {id} = req.params
    const {id_user} = req.body
    console.log(id_user, "id User")
    console.log(id, "id")

    const search = await Wishlist.findByPk(id);
    console.log(search)
    search.destroy()
    const result = await Wishlist.findAll({
        where: {
            userId: id_user
        },include: Product
    });
    res.status(200).send(result)
})

module.exports = router;