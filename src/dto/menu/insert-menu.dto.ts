import { IsDefined, IsNotEmpty, IsString, IsInt, IsOptional } from "class-validator";

export class InsertMenuDTO {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsDefined()
    @IsInt()
    price!: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    fileId?: string;
}