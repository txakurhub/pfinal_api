const { Router } = require("express");
const { Product ,Wishlist, wishlist_product} = require("../db");
const router = Router();

router.post("/", async(req, res)=>{
try {
    const {user_id, product_id} = req.body
    console.table(req.body)
    if(!user_id || !product_id){
        res.status(404).send("Parameters incompletes")
    }else{
        const create = await Wishlist.create({
            userId: user_id 
        });
        const searchProduct = await Product.findByPk(product_id);
        await create.addProduct(searchProduct);

        res.status(200).send(searchProduct);
    }
} catch (error) {
    console.log(error)
}
})
router.get("/:id", async(req, res)=>{
    const {id} = req.params
    const result = await Wishlist.findAll({
        where: {
            userId: id
        },
        include: Product
    })
    console.log(result, "user search")
    res.status(200).send(result)
})
router.delete("/", async(req, res)=>{
    
    const {id_user, id} = req.body
    console.log(id_user, "id User")
    console.log(id, "id")
  if(!id_user || !id){
    res.status(404).send("error Parameter not send")
  }
    const search = await Wishlist.findByPk(id);
    if(search){
        search.destroy()
        const result = await Wishlist.findAll({
            where: {
                userId: id_user
            },include: Product
        });
        res.status(200).send(result)
    }
    else{
        const result = await Wishlist.findAll({
            where: {
                userId: id_user
            },include: Product
        });
        res.status(400).send(result)
    }

})

module.exports = router;