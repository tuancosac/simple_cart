import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, ValidationPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { ResponseData } from '../global/globalClass';
import { HttpStatus, HttpMessage } from '../global/globalEnum';

@Controller('cart')
@UseGuards(AuthGuard('jwt')) 
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
    try {
      const accountId = req.user.id; 
      const data = await this.cartService.getCart(accountId);
      return new ResponseData(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async addToCart(
    @Req() req: any, 
    @Body(new ValidationPipe({ whitelist: true })) addToCartDto: AddToCartDto
  ) {
    try {
      const accountId = req.user.id;
      const data = await this.cartService.addToCart(accountId, addToCartDto);
      return new ResponseData(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error: any) {
      return new ResponseData(null, HttpStatus.ERROR, error.message || HttpMessage.ERROR);
    }
  }

  @Patch('/:productId')
    async updateQuantity( @Req() req: any, @Param('productId') productId: string, @Body('quantity') quantity: number, ) {
    try {
        const accountId = req.user.id;
        const data = await this.cartService.updateQuantity(accountId, Number(productId), quantity);
        return new ResponseData(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error: any) { return new ResponseData(null, HttpStatus.ERROR, error.message || HttpMessage.ERROR); }
}

  @Delete('/:productId')
  async removeCartItem(@Req() req: any, @Param('productId') productId: string) {
    try {
      const accountId = req.user.id;
      const result = await this.cartService.removeCartItem(accountId, Number(productId));
      return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData(false, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}