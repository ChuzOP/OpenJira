interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData : SeedData = {
    entries: [
        {
            description: 'lorem',
            createdAt: Date.now(),
            status: 'pending',
          },
          {
            description: 'lorem2',
            createdAt: Date.now() - 100000000,
            status: 'in-progress',
          },
          {
            description: 'lorem3',
            createdAt: Date.now() - 100000,
            status: 'finished',
          },
    ]
}