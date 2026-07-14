import {MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
    @IsNotEmpty({ message: "Vùng này không được để trống" })
    categoryId?: number;

    @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
    @MinLength(5, { message: "Vùng này phải hơn 5 ký tự" })
    productName?: string;

    @IsNotEmpty({ message: 'Giá không được để trống' })
    @IsNumber({}, { message: "Vùng này phải là số" })
    price?: number;

    @IsNotEmpty({ message: 'Số lượng không được để trống' })
    @IsNumber({}, { message: "Vùng này phải là số" })
    quantity?: number;
}