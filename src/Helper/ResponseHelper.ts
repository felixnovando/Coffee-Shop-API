import { Response } from "express";
import { ErrorResponse, SuccessResponse } from "../types";

export const handleTransaction = async (res: Response, message: string, handle: () => Promise<object | null>) => {
    try {
        const data = await handle();
        res.json(<SuccessResponse>{
            message: message,
            data: data,
        });
    } catch (e) {
        res.status(500).json(<ErrorResponse>{
            message: "Error Occured",
            errors: [(e as Error).message]
        });
    }
};

export const handleError = async (res: Response, errors: string[]) => {
    res.status(500).json(<ErrorResponse>{
        message: "Invalid Inputs",
        errors: errors
    });
};