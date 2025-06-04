const Color = require('../models/Color');

const createColor = async(req,res,next)=>{
    const {name,hex} = req.body;
    try {
        if(!name){
            res.status(400).json({name:"Color name is required"})
        }else if(!hex){
            res.status(400).json({hex:"Color code is required"})
        }

        const newColor = new Color({
            name:name,
            hex:hex
        });

        const savedColor = await newColor.save();
        res.status(201).json({Message:"Color Added Successfully"})
    } catch (error) {
        next(error);
    }
}

const updateColor = async(req,res,next)=>{
    const {name,hex}= req.body;
    try {
        if(!name){
            res.status(400).json({name:"Color name is required"})
        }else if(!hex){
            res.status(400).json({hex:"Color code is required"})
        }

        const  color = await Color.findById(req.params.id);
        if(!color){
            res.status(404);
            throw new Error('Color not found');
        }
        color.name = name || color.name;
        color.hex = hex || color.hex;
        const updatedColor = await color.save();
        res.status(200).json({Message:"Successfully Updated the Color "})
    } catch (error) {
        next(error);
    }
}

const deleteColor = async(req,res,next)=>{
    try {
        const color = await Color.findById(req.params.id);
        if(!color){
            res.status(404);
            throw new Error('Color not found');
        }
        await color.deleteOne();
        res.status(200).json({Message:"Color deleted successfully"})
    } catch (error) {
        next(error);
    }
}

const getAllColors = async(req,res,next)=>{
    try {
        const colors = await Color.find();
        res.status(200).json({Message:"Successfully fetched all products",data:colors})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createColor,
    updateColor,
    deleteColor,
    getAllColors
}