import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("account")
export class AccountEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    permission!: string;
}