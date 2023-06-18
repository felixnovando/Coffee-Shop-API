import { IsDefined, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class InsertUserDTO {
    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    role!: string;
}