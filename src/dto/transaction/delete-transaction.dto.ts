import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeleteTransactionDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}