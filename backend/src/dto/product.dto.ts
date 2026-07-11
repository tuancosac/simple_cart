import {MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
    @IsNotEmpty({ message: "Vùng này không được để trống" })
    categoryId?: number;

    @MinLength(5, { message: "Vùng này phải hơn 5 ký tự" })
    productName?: string;

    @IsNumber({}, { message: "Vùng này phải là số" })
    price?: number;
}