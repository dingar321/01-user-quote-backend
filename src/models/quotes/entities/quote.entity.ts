import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

@Entity('quotes')
export class Quote{

    @PrimaryGeneratedColumn({name: 'quote_id'})
    quoteid: number;

    @Column({
        name: 'content',
        type: "varchar",
        length: 300,
        nullable: false
        
    })
    content: string;

}