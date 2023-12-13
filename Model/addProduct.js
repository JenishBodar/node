const mongoose = require('mongoose');

const login_model = new mongoose.Schema({
    product: {
        type: String
    },
    name: {
        type:String
    },
    email: {
        type:String
    },
    password: {
        type:String
    }
})
const productModel = mongoose.model('Product', login_model);

module.exports = productModel;