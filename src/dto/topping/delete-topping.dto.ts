import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteToppingDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}