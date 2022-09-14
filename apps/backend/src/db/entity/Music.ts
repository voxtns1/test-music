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

  @OneToMany(
    () => NavMusicCategory,
    (navMusicCategory) => navMusicCategory.idMusic2
  )
  navMusicCategories: NavMusicCategory[];

  static async findByPreferenceMusic(author: number[], category: number[]) {
    const query = this.createQueryBuilder('music')
      .select([
        'music.id as id',
        'music.name as name',
        'cover2.name as cover',
        'GROUP_CONCAT(DISTINCT author2.name, " ") as author',
        'GROUP_CONCAT(DISTINCT `category2`.`name`, " ") as category',
      ])
      .innerJoin(
        NavMusicAuthor,
        'navMusicAuthor',
        'navMusicAuthor.id_music = music.id'
      )
      .innerJoin(
        NavMusicCategory,
        'navMusicCategory',
        'navMusicCategory.id_music = music.id'
      )
      .innerJoin(Author, 'author2', 'navMusicAuthor.id_author = author2.id')
      .innerJoin(
        Category,
        'category2',
        'category2.id = navMusicCategory.id_category'
      )
      .innerJoin(Cover, 'cover2', 'music.id_cover = cover2.id')
      .where((qb) => {
        const whereCategorys = subQueryWhere(
          'id_category',
          category,
          NavMusicCategory,
          qb
        );

        const whereAuthors = subQueryWhere(
          'id_author',
          author,
          NavMusicAuthor,
          qb
        );

        const whereSubQuery =
          whereCategorys && whereAuthors
            ? `${whereCategorys} AND ${whereAuthors}`
            : whereCategorys || whereAuthors;

        return whereSubQuery;
      })
      .groupBy('music.id')
      .limit(5);

    const req = await query.getRawMany();
    return req.map((val) => ({ ...val, category: val.category.split(',') }));
  }
}

function subQueryWhere(idCond: string, ids: number[], navTable, qb) {
  if (ids.length <= 0) return;
  const [id, ..._ids] = ids;
  let whereSubQuery = `a.${idCond} = ${id} `;
  const subQuery = qb.subQuery().select('a.id_music').from(navTable, 'a');

  _ids.forEach((id, inx) => {
    whereSubQuery += `AND a${inx}.${idCond} = ${id}`;
    subQuery.innerJoin(navTable, `a${inx}`, `a.id_music = a${inx}.id_music`);
  });
  subQuery.where(whereSubQuery);

  return `music.id IN ${subQuery.getQuery()}`;
}
