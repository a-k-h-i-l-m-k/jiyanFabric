const Brand = require('../models/Brands');
const saveBase64Image = require('../utils/saveBase64Image');

const getAllBrands = async(req,res,next)=>{
    try {
        const brands = await Brand.find();
        res.status(200).json({Message:"Brand list Fetched Successfully",data:brands})
    } catch (error) {
        next(error);
    }
}

const createBrand = async(req,res,next)=>{
    const {brandName,brandImg:base64Image}= req.body
    try {
        if(!brandName){
            res.status(400);
            throw new Error("Brand name is required");
        }else if(!base64Image){
            res.status(400);
            throw new Error("Brand image is required"); 
        }

        let image = null;
        if(base64Image){
            image = saveBase64Image(base64Image,"brands");
        }

        const newBarnd = new Brand({
            brandName,
            brandImg:image
        });

        const savedBrand = await newBarnd.save();
        res.status(201).json({Message:"Brand Added Successfully"})

    } catch (error) {
        next(error)
    }
}

const updateBrand = async(req,res,next)=>{
    const {brandName,brandImg:base64Image}= req.body;
    try {
         const brand = await Brand.findById(req.params.id)
         if(!brand){
            res.status(404);
            throw new Error("Brand not found");
         }else if(!brandName){
            res.status(400);
            throw new Error("Brand name is required");
        }

        let image = null
        if(base64Image){
            image = saveBase64Image(base64Image,"brands");
        }

        brand.brandName= brandName;
        brand.brandImg = image ? image :brand.brandImg
        const updatedBrand = await brand.save();
        res.status(200).json({Message:"Brand Updated successfully"});
    } catch (error) {
        next(error)
    }
}

const deleteBrand = async(req,res,next)=>{
    try {
        const brand = await Brand.findById(req.params.id);
        if(!brand){
            res.status(404);
            throw new Error("Brand not found");
        }
        await brand.deleteOne();
        res.status(200).json({Message:"Brand deleted successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
}