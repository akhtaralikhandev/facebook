import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// Configure multer for file uploads
const upload = multer({ dest: "/tmp" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dzumurjj4",
  api_key: "151231199569346",
  api_secret: "tiLemh0Z0yYGSFLatRhJOec2Va8",
});

export const POST = async (req, res) => {
  try {
    // Upload the file to Cloudinary
    console.log(req);
    const result = await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          const path = req.file.path;
          cloudinary.uploader.upload(path, (result) => {
            resolve(result);
          });
        }
      });
    });

    // Return the uploaded image URL
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
