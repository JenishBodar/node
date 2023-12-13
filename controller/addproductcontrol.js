const productModel = require('../model/addProduct');
const loginModel = require("../model/mailModel");

const addProduct = async (req, res) => {
    const token = req.headers.authorization;
    const find = await loginModel.findOne({token: token});
    const obj = {
        product : req.body.product,
        name : find.name,
        email: find.email,
        password : find.password
    }
    const findProduct = await productModel.find({email:obj.email});
    if(!findProduct || findProduct.length === 0)
    {
        const data = await productModel.create(obj);
        res.status(200).json({
            status : 'success',
            data
        })  
    }else
    {
        // const add = findProduct[0].product + ',' + req.body.product;
        const add = findProduct[0]?.product ? findProduct[0].product + ',' + req.body.product : req.body.product;
        const obj1 = {
            product : add,
            name : find.name,
            email : find.email, 
            password : find.password
        }
        const data = await productModel.updateOne({email : obj.email},obj1);
        res.status(200).json({
            status : 'success',
            data
        })
    }
}

module.exports = addProduct;
