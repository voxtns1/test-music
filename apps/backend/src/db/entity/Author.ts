import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { NavMusicAuthor } from './NavMusicAuthor';

@Entity('author', { schema: 'music' })

export class Author extends BaseEntity {
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

  @Column('datetime', {
    name: 'update',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  update: Date | null;

  @OneToMany(() => NavMusicAuthor, (navMusicAuthor) => navMusicAuthor.idAuthor2)
  navMusicAuthors: NavMusicAuthor[];
}
