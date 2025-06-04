const Banner = require("../models/Banner");
const saveBase64Image = require("../utils/saveBase64Image");

const getAllBanners = async(req,res,next)=>{
    try {
        const banners = await Banner.find();
        res.status(200).json({Message:"Banners fetched successfully",data:banners});
    } catch (error) {
        next(error);
    }
}

const createBanner = async(req,res,next)=>{
    const {bannerImg:base64Image,showImg}= req.body;
    try {
        let image = null;
        if(!base64Image){
            res.status(400);
            throw new Error("Banner image is required");
        }else{
            image = saveBase64Image(base64Image,"banners");
        }
        const newBanner = await Banner({
            bannerImg:image,
            showImg
        });
        const savedBanner = await newBanner.save();
        res.status(201).json({Message:"Banner Added Successfully"})
    } catch (error) {
        next(error)
    }
}

const updateBanner = async(req,res,next)=>{
    const {bannerImg:base64Image,showImg} = req.body;
    try {
        let image = null;
        const banner = await Banner.findById(req.params.id);
        if(!banner){
            res.status(404);
            throw new Error("Banner not found");
        }
        if(base64Image){
            image = saveBase64Image(base64Image,"banners");
        }
        banner.bannerImg = image ? image : banner?.bannerImg;
        banner.showImg = showImg
        const updatedBanner = await banner.save();
        res.status(200).json({Message:"Banner updated successully"})
    } catch (error) {
        next(error);
    }
}

const deleteBanner = async(req,res,next)=>{
    try {
        const banner = await Banner.findById(req.params.d);
        if(!banner){
            res.status(404);
            throw new Error("Banner not found");
        }
        await banner.remove();
        res.status(200).json({Message:"Banner deleted successfully"})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBanners,
    createBanner,
    updateBanner,
    deleteBanner
}