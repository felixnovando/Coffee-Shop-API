import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class DeletePaymentDTO {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
}