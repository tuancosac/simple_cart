import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AccountDto {
    @IsNotEmpty({ message: 'Tài khoản không được để trống' })
    @IsString()
    @MinLength(4, { message: 'Tài khoản phải có ít nhất 4 ký tự' })
    username!: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @IsString()
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password!: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email!: string;
}