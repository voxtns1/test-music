import { Author, Category, Music } from '@music/backend/entity';
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
    const author = preferenceUser['author']?.children || [];
    const category = preferenceUser['category']?.children || [];
    return Music.findByPreferenceMusic(author, category);
  }

  private transformPreference(query: string) {
    try {
      const preferences = query.split('&');
      return preferences.reduce<Record<string, PreferenceQuery>>((preview, values) => {
        const [category, stringList] = values.split(":");
        const children = stringList.split(',').map(Number);
        if(children) {
          preview[category] = { category, children };
        }
        return preview;
      }, {});
    }catch(e) {
      return {};
    }
  }
}
