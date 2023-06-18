import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { handleError } from "../helper/ResponseHelper";

const IMAGE_TYPES: string[] = process.env.IMAGE_EXTENSIONS ? process.env.IMAGE_EXTENSIONS.split(";") : [];

const diskStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(path.resolve(__dirname, "..", "..", "public", "uploads")));
    },
    filename(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: diskStorage,
    fileFilter(req, file, callback) {
        if (IMAGE_TYPES.includes(file.mimetype))
            return callback(null, true);

        return callback(new Error("Must be valid image"));
    },
});

const FileMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const uploadSingleImage = upload.single("photo");

    uploadSingleImage(req, res, (error) => {
        if (error) {
            handleError(res, [(error as Error).message]);
            return;
        }
        next();
    });
};

export default FileMiddleware;