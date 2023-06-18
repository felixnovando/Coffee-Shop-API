import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteCustomerDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}