import { Author, Category, Cover, Music, NavMusicAuthor, NavMusicCategory } from '@music/backend/entity';
import { Preference, PreferenceQuery, ResultMusic } from '@music/core/type';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<Preference[]> {
    const authorAll = await Author.find();
    const categoryAll = await Category.find();

    return [
      {
        category: 'author',
        children: authorAll.map(({id, name}) => ({ id, name })),
      },
      {
        category: 'category',
        children: categoryAll.map(({id, name}) => ({ id, name })),
      }
    ];
  }

  async getQuery(query: string): Promise<ResultMusic[]> {
    const preferenceUser = this.transformPreference(query);
    const musicAll = await Music.find();
    const coverAll = await Cover.find();
    const authorAll = await Author.find();

    const results = {};

    const musics = musicAll.map((music) => {
      return {
        id: music.id,
        name: music.name,
        category: [],
        author: '',
        cover: coverAll.find((aut) => aut.id === music.id_cover).name
      };
    });

    if(preferenceUser?.['author']) {
      const author = preferenceUser['author'];
      const navMusicAuthor = await NavMusicAuthor.find();
      navMusicAuthor.filter(nav => author.children.includes(nav.id_author)).forEach(val => {
        results[val.id_music] = val;
      });
    }

    if(preferenceUser?.['category']) {
      const category = preferenceUser['category'];
      const navMusicCategory = await NavMusicCategory.find();
      navMusicCategory.filter(nav => category.children.includes(nav.id_category)).forEach(val => {
        results[val.id_music] = val;
      });
    }

    return [musics[0]];
  }

  private transformPreference(query: string) {
    const preferences = query.split('&');
    return preferences.reduce<Record<string, PreferenceQuery>>((preview, values) => {
      const [category, stringList] = values.split(":");
      const children = stringList.split(',').map(Number);
      if(children) {
        preview[category] = { category, children };
      }
      return preview;
    }, {});
  }
}
