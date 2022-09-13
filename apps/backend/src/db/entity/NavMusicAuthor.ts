import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class NavMusicAuthor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_music: number

    @Column()
    id_author: number

    @Column()
    created: Date

    @Column()
    update: Date


}
