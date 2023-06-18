import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { InsertToppingDTO } from "./insert-topping.dto";

export class UpdateToppingDTO implements Partial<InsertToppingDTO>{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;

    name?: string | undefined;
    price?: number | undefined;
    fileId?: string | undefined;
}