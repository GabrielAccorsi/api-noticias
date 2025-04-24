import express from 'express';
import upload from '../middlewares/upload.js'; 
import cloudinary from '../database/cloudinary.js';

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const b64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "devlab", 
    });

    res.send({ url: result.secure_url });
  } catch (err) {
    res.status(500).send({ message: "Erro ao fazer upload", error: err });
  }
});
export default router;