import { IsDefined, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginDTO {
    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    password!: string;
}