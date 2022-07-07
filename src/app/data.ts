export class Books {
  id: number = 0;
  name: string = '';
  published?: Date;
  pages?: number = 0;
  genreId: number = 0;
  authorId: number = 0;
}

export class Genres {
  id: number = 0;
  name: string = "";
}

export class Authors {
  id: number = 0;
  name: string = '';
  genreId: number[] = [];
  born?: Date ;
  died?: Date;
}

export const genres:Genres[] = [
  {
    id: 1,
    name: 'Novel',
  },
  {
    id: 2,
    name: 'Fantasy',
  },
  {
    id: 3,
    name: 'History',
  },
  {
    id: 4,
    name: 'Comedy',
  },
];

export const authors: Authors[] = [
  {
    id: 1,
    name: 'Paulo Coelho',
    genreId: [1],
  },
  {
    id: 2,
    name: 'Mark Twain',
    genreId: [1],
  },
  {
    id: 3,
    name: 'George R.R. Martin',
    genreId: [2],
  },
  {
    id: 4,
    name: 'William R.Shirer',
    genreId: [3],
  },
  {
    id: 5,
    name: 'Rachel Dratch',
    genreId: [4],
  },
];

export const books: Books[] = [
  {
    id: 1,
    name: 'The Alchemist',
    genreId: 1,
    authorId: 1,
  },
  {
    id: 2,
    name: 'The Adventures of Tom Sawyer',
    genreId: 1,
    authorId: 2,
  },
  {
    id: 3,
    name: 'A Game of Thrones',
    genreId: 2,
    authorId: 3,
  },
  {
    id: 4,
    name: 'The rise and fall of the third reich',
    genreId: 3,
    authorId: 4,
  },
  {
    id: 5,
    name: 'Girl Walks into a Bar...',
    genreId: 4,
    authorId: 5,
  },
];
