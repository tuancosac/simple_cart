import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from '../global/globalClass';
import { HttpStatus, HttpMessage } from '../global/globalEnum';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from 'src/dto/product.dto';
import { ProductsEntity } from 'src/entities/products.entity';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getProducts(): Promise<ResponseData<ProductsEntity[]>> {
        try{
            const data = await this.productService.getProducts();
            return new ResponseData<ProductsEntity[]>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductsEntity[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createProduct(@Body(new ValidationPipe({ whitelist: true })) productDto: ProductDto): Promise<ResponseData<ProductsEntity | null >> {
        try {
            const data = await this.productService.createProduct(productDto);
            return new ResponseData<ProductsEntity>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductsEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async detailProduct(@Param('id') id: number): Promise<ResponseData<ProductsEntity | null>> {
        try {
            const data = await this.productService.detailProduct(Number(id));
            return new ResponseData<ProductsEntity | null>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductsEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateProduct(@Body() productDto: ProductDto, @Param('id') id: number): Promise<ResponseData<ProductsEntity | null>> {
        try {
            const data = await this.productService.updateProduct(Number(id), productDto);
            return new ResponseData<ProductsEntity | null>(data, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductsEntity | null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteProduct(@Param("id") id: number): Promise<ResponseData<boolean>> {
        try {
            const result = await this.productService.deleteProduct(Number(id));
            return new ResponseData<boolean>(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>(false, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}