import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Music extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_cover: number

    @Column()
    name: string

    @Column()
    created: Date

    @Column()
    update: Date

}
