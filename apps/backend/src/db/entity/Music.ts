import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Author } from './Author';
import { Category } from './Category';
import { Cover } from './Cover';
import { NavMusicAuthor } from './NavMusicAuthor';
import { NavMusicCategory } from './NavMusicCategory';

@Index('FK_music_cover', ['idCover'], {})
@Entity('music', { schema: 'music' })
export class Music extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'id_cover' })
  idCover: number;

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

  @ManyToOne(() => Cover, (cover) => cover.music, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_cover', referencedColumnName: 'id' }])
  idCover2: Cover;

  @OneToMany(() => NavMusicAuthor, (navMusicAuthor) => navMusicAuthor.idMusic2)
  navMusicAuthors: NavMusicAuthor[];

  @OneToMany(() => NavMusicCategory, (navMusicCategory) => navMusicCategory.idMusic2)
  navMusicCategories: NavMusicCategory[];

  static async findByPreferenceMusic(author: number[], category: number[]) {
    const authorQuery = reduceWhereQuery('author2.id', author);
    const categoryQuery = reduceWhereQuery('category2.id', category);
    let whereQuery = authorQuery || categoryQuery || '';
    if(authorQuery && categoryQuery) {
      whereQuery = `${authorQuery} and ${categoryQuery}`;
    }

    const query = this.createQueryBuilder('music')
      .select([
        'music.id as id',
        'music.name as name',
        'cover2.name as cover',
        'GROUP_CONCAT(DISTINCT author2.name, " ") as author',
        'GROUP_CONCAT(DISTINCT `category2`.`name`, " ") as category',
        'SUM(DISTINCT category2.id) AS SUMcategory2',
        'SUM(DISTINCT author2.id) AS SUMauthor2'
      ])
      .innerJoin(NavMusicAuthor, 'navMusicAuthor', 'navMusicAuthor.id_music = music.id')
      .innerJoin(NavMusicCategory, 'navMusicCategory', 'navMusicCategory.id_music = music.id')
      .innerJoin(Author, 'author2', 'navMusicAuthor.id_author = author2.id')
      .innerJoin(Category, 'category2', 'category2.id = navMusicCategory.id_category')
      .innerJoin(Cover, 'cover2', 'music.id_cover = cover2.id')
      .where(whereQuery)
      .orderBy('SUMcategory2', 'DESC')
      .groupBy('music.id')
      .limit(5);

    const req = await query.getRawMany();
    return req.map(val => ({ ...val, category: val.category.split(',') }));
  }
}

function reduceWhereQuery(cond: string, ids: number[]) {
  if(ids.length <= 0) return;
  const reduce = ids.reduce((preview, id) => {
    preview += `or ${cond}=${id} `;
    return preview;
  }, "");
  return reduce.slice(3);
}
