import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/models/product.model';
import { ProductsEntity } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) {}

    async getProducts(): Promise<ProductsEntity[]> {
        return await this.productsRepository.find(); 
    }

    async createProduct(productDto: ProductDto): Promise<ProductsEntity> {
        const newProduct = this.productsRepository.create(productDto);
        return await this.productsRepository.save(newProduct);
    }

    async detailProduct(id: number): Promise<ProductsEntity | null> {
        return await this.productsRepository.findOneBy({ id: id });
    }
    
    async updateProduct(id: number, productDto: ProductDto): Promise<ProductsEntity | null> {
        const productExisted = await this.detailProduct(id);
        if (!productExisted) {
            throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
        }

        await this.productsRepository.update(id, productDto);
        
        return await this.detailProduct(id);
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productsRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}