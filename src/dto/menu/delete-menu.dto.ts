import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteMenuDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}