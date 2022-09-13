import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Cover } from './Cover';

@Entity()
export class Music extends BaseEntity {
    @ManyToOne(() => Cover)
    @JoinColumn({ name: 'id_cover' })
    private _cover: never;

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
