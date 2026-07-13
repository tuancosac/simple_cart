import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, CategoriesEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {}