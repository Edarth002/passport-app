import Image from "../models/Image.js";
import path from 'path';

export const uploadImage = async (req, res) => {
    try {
        if (!req) {
            return res.status(400).json({message: "Image not included, try sharing your awesome gallery with us :)"})
        }

        //Replacing all backward slashes with forward slashes...
        const imagePath = req.file.path.replace(/\\/g, "/");
        const {title} = req.body;

        const newImage = new Image({
            imageUrl: imagePath,
            title,
            uploadedAt: new Date()
        })

        const savedImage = await newImage.save()
        res.status(200).json(savedImage)
    } catch (error) {
        console.log("Error occured in sending images due to: ", error);
        res.status(501).json({message:"Image not uploaded, not my problem, try uploading again or smash your pc:)"})
    }
}

export const myGallery = async(req, res) => {
    try {
        const images = await Image.find().sort({uploadedAt: -1 })
        res.status(200).json(images)
    } catch (error) {
        console.log("Couldn't fetch your images, either they are hiding or they are just your imaginations:)");
        res.status(500).json({message: "Server could not find images"})
    }
}