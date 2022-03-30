import internal from "stream";
import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

@Entity('quotes')
export class Quote{

    //uuid
    @PrimaryGeneratedColumn({name: 'quote_id'})
    quoteId: number;

    @Column({
        name: 'content',
        type: "varchar",
        length: 300,
        nullable: false
        
    })
    content: string;

    @Column({
        name: 'upvotes',
        type: 'int',
        nullable: false
    })
    upvotes: number;

}