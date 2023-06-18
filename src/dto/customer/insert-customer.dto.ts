import { IsDefined, IsNotEmpty, IsString, IsEmail } from "class-validator";

export class InsertCustomerDTO {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    phone!: string;
}