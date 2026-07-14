import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountDto } from 'src/dto/account.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
    
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountsRepository: Repository<AccountEntity>
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
        await this.accountsRepository.update(id, accountDto);
        return await this.detailAccount(id);
    }

    async deleteAccount(id: number): Promise<boolean> {
        const result = await this.accountsRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}