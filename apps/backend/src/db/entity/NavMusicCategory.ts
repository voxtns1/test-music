import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class NavMusicCategory extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_music: number

    @Column()
    id_category: number

    @Column()
    created: Date

    @Column()
    update: Date

}
