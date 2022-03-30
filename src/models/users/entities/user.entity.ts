import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "../../quotes/entities/quote.entity";

@Entity('users')
export class User{

    //uuid
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    lastName: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    password: string;


    //1:1 relation 
    //user <--> quote
    @OneToOne(type => Quote, {
        nullable: true, 
        cascade: true
    })
    @JoinColumn({
        name: 'quote_tk'
    })
    quoteTk: Quote;
}