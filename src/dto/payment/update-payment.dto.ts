import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { InsertPaymentDTO } from "./insert-payment.dto";

export class UpdatePaymentDTO implements Partial<InsertPaymentDTO> {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;

    name?: string | undefined;
}