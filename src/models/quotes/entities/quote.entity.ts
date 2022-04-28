import { User } from "src/models/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('quotes')
export class Quote {

    //uuid
    @PrimaryGeneratedColumn({ name: 'quote_id' })
    quoteId: number;


    @Column({
        name: 'content',
        type: "varchar",
        length: 300,
        nullable: false

    })
    content: string;


    @Column({
        name: 'votes',
        type: 'int',
        nullable: false
    })
    votes: number;

    @Column({
        name: 'created',
        type: 'timestamp'
    }) // Recommended
    created: Timestamp;


    //1:1 relation 
    //user 1--m quote
    @ManyToOne(type => User, {
        nullable: false,
        cascade: true
    })
    @JoinColumn({
        name: 'user_tk'
    })
    userTk: User;
}