import multer from "multer";
import express from 'express';
import path from 'path';
import { uploadImage } from "../controllers/imageController.js";
import { myGallery } from "../controllers/imageController.js";


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req, file, cb)=>{
        const suffix = Date.now()
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + "-" + suffix + ext )
    }
})

const upload = multer({storage})

//Routes

router.post("/upload", upload.single("image"), uploadImage )

router.get("/gallery", myGallery)

export default router;