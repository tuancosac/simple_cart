import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { AccountEntity } from 'src/entities/account.entity';
import { ProductsEntity } from 'src/entities/products.entity';

@Entity("carts")
export class CartEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  // Một người dùng có thể có nhiều sản phẩm trong giỏ hàng
  @ManyToOne(() => AccountEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account!: AccountEntity;

  // Một sản phẩm có thể nằm trong giỏ hàng của nhiều người
  @ManyToOne(() => ProductsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: ProductsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}