import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './Category';
import { Music } from './Music';

@Index('FK_nav_music_category_music', ['idMusic'], {})
@Index('FK_nav_music_category_category', ['idCategory'], {})
@Entity('nav_music_category', { schema: 'music' })

export class NavMusicCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_music' })
  idMusic: number;

  @Column('int', { name: 'id_category' })
  idCategory: number;

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

  @ManyToOne(() => Category, (category) => category.navMusicCategories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  idCategory2: Category;

  @ManyToOne(() => Music, (music) => music.navMusicCategories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_music', referencedColumnName: 'id' }])
  idMusic2: Music;
}
