import { Type } from "class-transformer";
import { IsArray, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested, ArrayMinSize } from "class-validator";
import "reflect-metadata";

export class InsertTransactionDTO{
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    paymentId!: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    customerId!: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => InsertDetailTransactionDTO)
    details!: InsertDetailTransactionDTO[];
}

export class InsertDetailTransactionDTO{
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    menuId!: string;

    @IsDefined()
    @IsInt()
    qty!: number;

    @IsString()
    @IsOptional()
    note?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InsertToppingDetailDTO)
    @IsOptional()
    toppingDetails?: InsertToppingDetailDTO[];
}

export class InsertToppingDetailDTO{
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    toppingId!: string;

    @IsDefined()
    @IsInt()
    qty!: number;

    @IsString()
    @IsOptional()
    note?: string;
}