import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { InsertCustomerDTO } from "./insert-customer.dto";

export class UpdateCustomerDTO implements Partial<InsertCustomerDTO>{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;
    
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
}