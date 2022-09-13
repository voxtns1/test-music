import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Music } from './Music';

@Entity('cover', { schema: 'music' })

export class Cover extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('timestamp', {
    name: 'created',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date | null;

  @Column('timestamp', {
    name: 'update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  update: Date | null;

  @OneToMany(() => Music, (music) => music.idCover2)
  music: Music[];
}
