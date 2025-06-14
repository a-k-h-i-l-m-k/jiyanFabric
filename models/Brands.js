const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandName:{
        type:String,
        required:true
    },
    brandImg:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Brand',brandSchema);