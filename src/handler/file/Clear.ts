import { Request, Response } from "express";
import { handleTransaction } from "../../helper/ResponseHelper";
import { getAllFile } from "../../model/File";
import path from "path";
import fs from "fs";

export const ClearFileHandler = async (req: Request, res: Response) => {

    handleTransaction(res, "Success", async () => {
        const dbImages = await getAllFile();
        const dbImagePaths = dbImages.map((image) => image.path.split("/")[1]);

        const actualImagePath = path.join(path.resolve(__dirname, "..", "..", "..", "public", "uploads"));
        const actualImages = fs.readdirSync(actualImagePath);

        //find image not in DB
        const imageNoDB = actualImages.filter((image) => !dbImagePaths.includes(image));

        for (const file_path of imageNoDB) {
            const file_final_path = path.join("public", "uploads", file_path);
            fs.readFile(file_final_path, (error, data) => {
                if (data) {
                    fs.unlink(file_final_path, (error) => {
                        if(error){
                            throw new Error(error.message);
                        }
                    });
                }
            });
        }

        return {
            result: `${imageNoDB.length} file deleted`
        };
    });
};