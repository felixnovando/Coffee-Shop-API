import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { InsertUserDTO } from "./insert-user.dto";

export class UpdateUserDTO implements Partial<InsertUserDTO>{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;

    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    role?: string | undefined;
}