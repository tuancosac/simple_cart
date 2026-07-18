import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from '../entities/cart.entity'; 
import { ProductsEntity } from 'src/entities/products.entity'; 
import { AccountModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, ProductsEntity]), 
    AccountModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}