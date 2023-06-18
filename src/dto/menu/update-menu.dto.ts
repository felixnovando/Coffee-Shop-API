import { IsDefined, IsNotEmpty, IsString } from "class-validator";
import { InsertMenuDTO } from "./insert-menu.dto";

export class UpdateMenuDTO implements Partial<InsertMenuDTO>{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    id!: string;

    name?: string | undefined;
    price?: number | undefined;
    fileId?: string | undefined;
}