export type ErrorResponse = {
    message: string;
    errors: string[]
};

export type SuccessResponse = {
    message: string;
    data: unknown;
};