import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PrismaClient} from "@prisma/client";
import {PaginationDto} from "../common/dtos";

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('ProductsService');

    onModuleInit() {
        this.$connect()
        this.logger.log('DB connected');
    }

    create(createProductDto: CreateProductDto) {

        return this.product.create({
            data: createProductDto
        });

    }

    async findAll(paginationDto: PaginationDto) {

        const {page = 1, limit = 10} = paginationDto;

        const count = await this.product.count();

        const totalPages = Math.ceil(count / limit);

        return {
            data: await this.product.findMany({
                take: limit,
                skip: (page - 1) * limit
            }),
            meta: {
                count,
                totalPages,
                page
            }
        };

    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
