import { File, FileInput, addFile } from "../model/File";

export const uploadFile = (file: Express.Multer.File): Promise<File> => {
    const result: FileInput = {
        name: file.originalname,
        path: `uploads/${file?.filename}`,
        size: file.size
    };

    return addFile(result);
};