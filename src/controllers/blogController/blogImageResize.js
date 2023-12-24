import sharp from 'sharp';

export default async (req, res, next) => {
    if (!req?.file) {
        // If there is no file, move to the next middleware
        next();
        return;
    }

    try {
        // Process the file using sharp
        await sharp(req.file.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`./upload/blog/${req.file.filename}`);
        
        // Continue to the next middleware
        next();
    } catch (error) {
        // Handle any errors that may occur during the image processing
        console.error("Error processing image:", error);
        next(error); // Pass the error to the next middleware
    }
};
