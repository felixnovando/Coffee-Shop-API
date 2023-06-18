import { ValidationError, validate } from "class-validator";

export const validateDTO = async (body: object): Promise<string[] | null> => {

    const validation = await validate(body);

    if (validation.length === 0) return null;

    const errors: string[] = [];
    
    //find error recursively
    addErrors(errors, validation);

    return errors;
};

function addErrors(errors: string[], validationErrors: ValidationError[]) {
    for (const val of validationErrors) {
        if (val.children && val.children.length > 0) {
            addErrors(errors, val.children);
            return;
        }

        if (val.constraints === undefined) continue;

        for (const constraint of Object.values(val.constraints))
            errors.push(constraint);
    }
}
