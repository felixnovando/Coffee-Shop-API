import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTransactionDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    note?: string;
}