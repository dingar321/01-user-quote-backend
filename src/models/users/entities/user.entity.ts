import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "../../quotes/entities/quote.entity";

@Entity('users')
export class User{

    //uuid
    @PrimaryGeneratedColumn({name: 'user_id'})
    userid: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'firstname',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    firstname: string;

    @Column({
        name: 'lastname',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    lastname: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false 
    })
    password: string;


    //1:1 relation 
    //user <--> quote
    @OneToOne(type => Quote, {
        nullable: true, 
        cascade: true
    })
    @JoinColumn({
        name: 'quote'
    })
    quote: Quote;
}