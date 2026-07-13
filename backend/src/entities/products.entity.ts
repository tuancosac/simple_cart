import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class ProductsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productName!: string;

    @Column()
    categoryId!: number;

    @Column({ type: 'int' })
    price!: number;
}