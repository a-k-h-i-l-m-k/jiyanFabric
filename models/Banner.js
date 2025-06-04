const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerImg:{
        type:String,
        required:true
    },
    showImg:Boolean
},{
    timestamps:true
});

module.exports = mongoose.model('Banner',bannerSchema);