import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class InsertPaymentDTO {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name!: string;
}