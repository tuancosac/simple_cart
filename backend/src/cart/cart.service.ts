import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { ProductsEntity } from 'src/entities/products.entity'; 

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    
    @InjectRepository(ProductsEntity)
    private readonly productRepository: Repository<ProductsEntity>,
  ) {}

  async getCart(accountId: number): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      where: { account: { id: accountId } },
      relations:{ product: true, }, 
      order: { createdAt: 'DESC' },
    });
  }

  async addToCart(accountId: number, addToCartDto: AddToCartDto): Promise<CartEntity> {
    const { productId, quantity } = addToCartDto;

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${productId}`);
    }
    
    let cartItem = await this.cartRepository.findOne({
      where: { 
        account: { id: accountId }, 
        product: { id: productId } 
      }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({
        account: { id: accountId } as any, 
        product: product,
        quantity: quantity
      });
    }

    return await this.cartRepository.save(cartItem);
  }

  async updateQuantity(accountId: number, productId: number, quantity: number): Promise<CartEntity> {
    const cartItem = await this.cartRepository.findOne({
      where: {
        account: { id: accountId },
        product: { id: productId }
      }
    });

    if (!cartItem) {
      throw new NotFoundException('Sản phẩm không tồn tại trong giỏ hàng');
    }

    if (quantity <= 0) {
      await this.removeCartItem(accountId, productId);
      throw new BadRequestException('Sản phẩm đã được xóa khỏi giỏ hàng do số lượng bằng 0');
    }

    cartItem.quantity = quantity;
    return await this.cartRepository.save(cartItem);
  }

  async removeCartItem(accountId: number, productId: number): Promise<boolean> {
    const result = await this.cartRepository.delete({
      account: { id: accountId } as any,
      product: { id: productId } as any
    });
    return result.affected ? result.affected > 0 : false;
  }
}