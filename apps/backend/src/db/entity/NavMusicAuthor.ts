import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Author } from "./Author";
import { Music } from "./Music";

@Index("FK_nav_music_author_music", ["idMusic"], {})
@Index("FK_nav_music_author_author", ["idAuthor"], {})
@Entity("nav_music_author", { schema: "music" })

export class NavMusicAuthor extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_music" })
  idMusic: number;

  @Column("int", { name: "id_author" })
  idAuthor: number;

  @Column("timestamp", {
    name: "created",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created: Date | null;

  @Column("timestamp", {
    name: "update",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  update: Date | null;

  @ManyToOne(() => Author, (author) => author.navMusicAuthors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_author", referencedColumnName: "id" }])
  idAuthor2: Author;

  @ManyToOne(() => Music, (music) => music.navMusicAuthors, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_music", referencedColumnName: "id" }])
  idMusic2: Music;
}
