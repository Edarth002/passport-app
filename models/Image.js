import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    uploadedAt:{
        type:Date,
        default: Date.now()
    },


});

const Image = mongoose.model("Image", ImageSchema);

export default Image;