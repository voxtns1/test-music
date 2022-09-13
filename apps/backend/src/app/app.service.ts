import { Author, Category } from '@music/backend/entity';
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
        category: 'generic',
        children: categoryAll.map(({id, name}) => ({ id, name })),
      }
    ];
  }

  getQuery(query: string): ResultMusic[] {
    console.log("sahdiuhasdu ---> ", this.transformPreference(query))
    return [
      {
        id: 1,
        name: 'Una espada sin igual',
        category: ['rock', 'andy'],
        author: 'Los autenticos decadentes',
        cover: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/love-song-mixtape-album-cover-template-design-250a66b33422287542e2690b437f881b_screen.jpg?ts=1635176340'
      }
    ];
  }

  private transformPreference(query: string) {
    const preferences = query.split('&');
    return preferences.reduce<PreferenceQuery[]>((preview, values) => {
      const [category, stringList] = values.split(":");
      const children = stringList.split(',').map(Number);
      if(children) {
        preview.push({ category, children });
      }
      return preview;
    }, []);
  }
}
