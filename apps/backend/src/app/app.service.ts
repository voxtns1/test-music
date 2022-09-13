import { Preference, ResultMusic } from '@music/core/type';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): Preference[] {
    return [
      {
        category: 'author',
        children: [
          {
            id: 0,
            name: 'julio'
          },
          {
            id: 1,
            name: 'pepe'
          },
          {
            id: 2,
            name: 'andres'
          },
        ],
      },
      {
        category: 'generic',
        children: [
          {
            id: 0,
            name: 'rock'
          },
          {
            id: 1,
            name: 'indigo'
          },
          {
            id: 2,
            name: 'clasic'
          },
        ],
      }
    ];
  }

  getQuery(query: string): ResultMusic[] {
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
}
