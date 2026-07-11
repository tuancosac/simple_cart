import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
    
    private products : Product[] = [
        {id: 1, categoryId: 1, productName: "Ky Tu", price: 210000},
        {id: 2, categoryId: 2, productName: "Tao do", price: 50000},
        {id: 3, categoryId: 3, productName: "Nam", price: 150000},
    ]

    getProducts(): Product[] {
        return this.products;
    }

    createProduct(): string {
        return 'POST product';
    }

    detailProduct(id: number): Product | undefined {
        return this.products.find(item => item.id === Number(id));
    }
    
    updateProduct(): string {
        return "UPDATE product";
    }

    deleteProduct(): string {
        return "DELETE product";
    }
}