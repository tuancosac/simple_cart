import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from '../global/globalClass';
import { HttpStatus, HttpMessage } from '../global/globalEnum';
import { Product } from 'src/models/product.model';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(): ResponseData<Product[]> {
        try{
            return new ResponseData<Product[]>(this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    
    }

    @Post()
    createProduct(@Body(new ValidationPipe) productDto: ProductDto): ResponseData<ProductDto> {
        try {
            return new ResponseData<ProductDto>(productDto, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ProductDto>({} as ProductDto, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    detailProduct(@Param('id') id: number): ResponseData<Product | undefined> {
        try {
            return new ResponseData<Product | undefined>(this.productService.detailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product | undefined>(undefined, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    updateProduct(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.updateProduct(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<string>('', HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    deleteProduct(): ResponseData<string> {
        try {
            return new ResponseData<string>(this.productService.deleteProduct(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<string>('', HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}