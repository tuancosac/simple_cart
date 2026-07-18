import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductsEntity } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {}