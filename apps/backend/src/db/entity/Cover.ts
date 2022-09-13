import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cover extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    created: Date

    @Column()
    update: Date

}
