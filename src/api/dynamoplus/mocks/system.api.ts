import { ActivityStatusType } from '@app/interfaces/interfaces';

export interface Activity {
  image: string;
  title: string;
  status: ActivityStatusType;
  date: number;
  owner: string;
}

export interface UserActivity extends Omit<Activity, 'owner'> {
  usd_value: number;
}

export interface TrendingActivity {
  title: string;
  owner: string;
  image: string;
  avatar: string;
  usd_value: number;
}
export class CollectionAttribute {
  name: string;
  type: CollectionAttributeType;

  constructor(name: string, type: CollectionAttributeType) {
    this.name = name;
    this.type = type;
  }
}

export class Index {
  name?: string;
  collection: Collection;
  conditions: string[];
  configuration: IndexConfigurationType;
  orderingKey?: string;

  constructor(
    collection: Collection,
    conditions: string[],
    configuration: IndexConfigurationType,
    ordering_key?: string,
    name?: string,
  ) {
    this.name = name;
    this.collection = collection;
    this.conditions = conditions;
    this.configuration = configuration;
    this.orderingKey = ordering_key;
  }
}

export enum IndexConfigurationType {
  OPTIMIZE_READ = 'OPTIMIZE_READ',
  OPTIMIZE_WRITE = 'OPTIMIZE_WRITE',
}
export enum CollectionAttributeType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
}

export class Collection {
  name: string;
  idKey?: string;
  orderingKey?: string;
  autoGeneratedId?: boolean;
  attributes?: CollectionAttribute[];

  constructor(
    name: string,
    idKey?: string,
    orderingKey?: string,
    autoGeneratedId?: boolean,
    attributes?: CollectionAttribute[],
  ) {
    this.name = name;
    this.idKey = idKey;
    this.orderingKey = orderingKey;
    this.autoGeneratedId = autoGeneratedId;
    this.attributes = attributes;
  }
}

const collections: Collection[] = [
  {
    name: 'book',
    idKey: 'isbn',
    orderingKey: 'order_unique',
    autoGeneratedId: false,
    attributes: [
      {
        name: 'author',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'title',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'genre',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'category',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'published_date',
        type: CollectionAttributeType.DATE,
      },
    ],
  },
  {
    name: 'restaurant',
    idKey: 'id',
    orderingKey: 'order_unique',
    autoGeneratedId: true,
    attributes: [
      {
        name: 'name',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'type',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'city',
        type: CollectionAttributeType.STRING,
      },
    ],
  },
  {
    name: 'customer',
    idKey: 'id',
    orderingKey: 'order_unique',
    autoGeneratedId: true,
    attributes: [
      {
        name: 'first_name',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'last_name',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'born_date',
        type: CollectionAttributeType.DATE,
      },
    ],
  },
  {
    name: 'booking',
    idKey: 'id',
    orderingKey: 'order_unique',
    autoGeneratedId: true,
    attributes: [
      {
        name: 'seats',
        type: CollectionAttributeType.NUMBER,
      },
    ],
  },
  {
    name: 'review',
    idKey: 'id',
    orderingKey: 'order_unique',
    autoGeneratedId: true,
    attributes: [
      {
        name: 'rate',
        type: CollectionAttributeType.STRING,
      },
      {
        name: 'restaurant',
        type: CollectionAttributeType.STRING,
      },
    ],
  },
];

const indexes = [
  {
    name: 'book_author',
    collection: new Collection('book'),
    conditions: ['author'],
    configuration: IndexConfigurationType.OPTIMIZE_READ,
  },
  {
    name: 'book_genre',
    collection: new Collection('book'),
    conditions: ['genre'],
    configuration: IndexConfigurationType.OPTIMIZE_WRITE,
    ordering_key: 'published_date',
  },
  {
    name: 'book_published_date',
    collection: new Collection('book'),
    conditions: ['published_date'],
    configuration: IndexConfigurationType.OPTIMIZE_READ,
  },
  {
    name: 'restaurant_type',
    collection: new Collection('restaurant'),
    conditions: ['type'],
    configuration: IndexConfigurationType.OPTIMIZE_READ,
  },
  {
    name: 'restaurant_city',
    collection: new Collection('restaurant'),
    conditions: ['city'],
    configuration: IndexConfigurationType.OPTIMIZE_WRITE,
  },
];

export const getCollectionsCount = (): Promise<number> => {
  return new Promise((res) => {
    res(collections.length);
  });
};

export const getIndexesCount = (): Promise<number> => {
  return new Promise((res) => {
    res(indexes.length);
  });
};

export const getClientAuthorizationCount = (): Promise<number> => {
  return new Promise((res) => {
    res(5);
  });
};

export const getIndexesByCollection = (collectionName: string): Promise<Index[]> => {
  return new Promise((res) => {
    res(getFakeIndexes().filter((i) => i.collection.name === collectionName));
  });
};

export const getIndexesCountByCollectionName = (collectionName: string): Promise<number> => {
  return new Promise((res) => {
    if (collectionName === 'book') {
      res(10);
    } else if (collectionName == 'restaurant') {
      res(20);
    } else {
      res(30);
    }
  });
};

export const getFakeDocuments = (collection_name: string): any[] => {
  const books = [
    {
      isbn: '12152142',
      title: 'Fight club',

      genre: 'pulp',
      category: 'narrative',
      published_date: new Date('1994-10-10'),
      author: {
        name: 'Chuck',
        lastName: 'Palhaniuk',
      },
    },
    {
      isbn: '18218281',
      title: 'Fight club',
      author: 'Choke',
      genre: 'pulp',
      category: 'narrative',
      published_date: new Date('1998-10-10'),
    },
    {
      isbn: '771711891',
      title: 'Män som hatar kvinnor',
      author: 'Stiel Larson',
      genre: 'thriller',
      category: 'narrative',
      published_date: new Date('2008-05-10'),
    },
    {
      isbn: '551712911',
      title: 'Pulp',
      author: 'Charles Bukowski',
      genre: 'pulp',
      category: 'narrative',
      published_date: new Date('2001-05-10'),
    },
  ];
  const customers = [
    {
      id: 1,
      first_name: 'Antonio',
      last_name: "D'Alessio",
      born_date: new Date('1988-12-12'),
      roles: [
        {
          name: 'ADMIN',
          grants: ['user', 'book'],
        },
        {
          name: 'READ',
          grants: ['restaurant'],
        },
      ],
    },
    {
      id: 2,
      first_name: 'Michele',
      last_name: 'Nicola',
      born_date: new Date('1918-12-12'),
      roles: [
        {
          name: 'READ',
          grants: ['restaurant'],
        },
      ],
    },
  ];
  const restaurants = [
    {
      id: 1,
      name: 'Vurria',
      type: 'pizzeria',
      city: 'Milan',
    },
    {
      id: 2,
      name: 'Flower',
      type: 'vegan',
      city: 'Milan',
    },
    {
      id: 3,
      name: 'Asahi',
      type: 'sushi',
      city: 'Pavia',
    },
  ];
  if (collection_name === 'book') {
    return books;
  } else if (collection_name === 'restaurant') {
    return restaurants;
  } else if (collection_name === 'customer') {
    return customers;
  }
  return [];
};
export const getFakeIndexes = (): Index[] => {
  return [...indexes];
};
export const getFakeCollections = (limit?: number, startingFrom?: string): Collection[] => {
  let result = [...collections];
  if (startingFrom) {
    const index = result.findIndex((c) => c.name === startingFrom);
    result = result.splice(index + 1);
  }
  if (limit) {
    return result.slice(0, limit);
  }
  return result;
};
export const getCollections = (limit: number, startingFrom?: string): Promise<Collection[]> => {
  return new Promise((res) => {
    res(getFakeCollections(limit, startingFrom));
  });
};

export const getCollection = (name: string): Promise<Collection | undefined> => {
  return new Promise((res) => {
    res(getFakeCollections().find((c) => c.name === name));
  });
};

export const getDocumentsByCollection = (collecionName: string): Promise<any[]> => {
  return new Promise((res) => {
    res(getFakeDocuments(collecionName));
  });
};

export const createCollection = (collection: Collection): Promise<Collection> => {
  return new Promise((res) => {
    collections.push(collection);
    res(collection);
  });
};

export const createIndex = (index: Index): Promise<Index> => {
  return new Promise((res) => {
    indexes.push({
      collection: index.collection,
      configuration: index.configuration,
      conditions: index.conditions,
      ordering_key: index.orderingKey,
      name: index.name || index.collection.name + ' _' + index.orderingKey + ' ' + index.conditions.join('_')
    });
    res(index);
  });
};
