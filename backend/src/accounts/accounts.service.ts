import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountDto } from 'src/dto/account.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AccountService {
    
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountsRepository: Repository<AccountEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount(accountDto: AccountDto): Promise<AccountEntity> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(accountDto.password, salt);
        const newAccount = this.accountsRepository.create({
            ...accountDto,
            password: hashedPassword
        });

        return await this.accountsRepository.save(newAccount);
    }

    async detailAccount(id: number): Promise<AccountEntity | null> {
        return await this.accountsRepository.findOneBy({ id: id });
    }

    async updateAccount(id: number, accountDto: AccountDto): Promise<AccountEntity | null> {
        const accountExisted = await this.detailAccount(id);
        if (!accountExisted) {
            throw new NotFoundException(`Không tìm thấy tài khoản với ID: ${id}`);
        }
        const updateData = { ...accountDto };
        if (updateData.password) {
            const salt = await bcrypt.genSalt();
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        await this.accountsRepository.update(id, updateData);
        return await this.detailAccount(id);
    }

    async deleteAccount(id: number): Promise<boolean> {
        const result = await this.accountsRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async login(loginDto: AccountDto): Promise<{ accessToken: string }> {
        const { username, password } = loginDto;

        // 1. Kiểm tra username có tồn tại trong DB không
        const account = await this.accountsRepository.findOneBy({ username });
        if (!account) {
            throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
        }

        // 2. Kiểm tra và so sánh mật khẩu băm (bcrypt.compare)
        const isPasswordMatched = await bcrypt.compare(password, account.password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
        }

        // 3. Tạo Payload (nội dung bên trong token)
        const payload = { id: account.id, username: account.username };

        // 4. Ký và tạo chuỗi Access Token
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}