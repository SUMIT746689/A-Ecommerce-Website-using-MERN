//External library

const { Products } = require("../../Model/products")

//Internal library


const products =async (req,res)=>{
const products = await Products.find({});

res.status(200).json({
    products : products
})

}
module.exports = {
    products
}