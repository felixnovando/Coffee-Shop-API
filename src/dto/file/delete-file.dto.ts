import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteFileDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}