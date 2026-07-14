import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class ProductsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    productName!: string;

    @Column()
    categoryId!: number;

    @Column({ type: 'int' })
    price!: number;

    @Column({ type: 'int' })
    quantity!: number;
}