import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteUserDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}