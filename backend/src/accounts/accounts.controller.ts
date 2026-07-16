import { Body, Param, Controller, Get, Post, Put, Delete, ValidationPipe } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { ResponseData } from '../global/globalClass';
import { HttpStatus, HttpMessage } from '../global/globalEnum';
import { AccountDto } from 'src/dto/account.dto';
import { AccountEntity } from 'src/entities/account.entity';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}
    
    @Post()
    async createAccount(@Body(new ValidationPipe({ whitelist: true })) accountDto: AccountDto): Promise<ResponseData<AccountEntity | null >> {
        try {
            const data = await this.accountService.createAccount(accountDto);
            return new ResponseData<AccountEntity>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<AccountEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    async detailAccount(@Param('id') id: number): Promise<ResponseData<AccountEntity | null>> {
        try {
            const data = await this.accountService.detailAccount(Number(id));
            return new ResponseData<AccountEntity | null>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<AccountEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    async updateAccount(@Body() accountDto: AccountDto, @Param('id') id: number): Promise<ResponseData<AccountEntity | null>> {
        try {
            const data = await this.accountService.updateAccount(Number(id), accountDto);
            return new ResponseData<AccountEntity | null>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<AccountEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    async deleteAccount(@Param("id") id: number): Promise<ResponseData<boolean>> {
        try {
            const result = await this.accountService.deleteAccount(Number(id));
            return new ResponseData<boolean>(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>(false, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post('/login')
    async login( @Body(new ValidationPipe({ whitelist: true })) loginDto: AccountDto ): Promise<ResponseData<{ accessToken: string } | null>> {
        try {
            const data = await this.accountService.login(loginDto);
            return new ResponseData<{ accessToken: string }>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error: any) {
            const statusCode = error.status || HttpStatus.ERROR; 
            const message = error.message || 'Đăng nhập thất bại';
            return new ResponseData<null>(null, statusCode, message);
        }
    }
}