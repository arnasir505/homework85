import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} is missing. Skipping drop...`);
  }
};

const collections: string[] = ['albums', 'artists', 'trackhistories', 'tracks', 'users'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [artist1, artist2] = await Artist.create(
    {
      name: 'The Weeknd',
      information:
        'Abel Makkonen Tesfaye (Amharic: አቤል መኮንን ተስፋዬ; born February 16, 1990), known professionally as the Weeknd, is a Canadian singer-songwriter.',
      image: 'fixtures/theWeeknd.jpg',
    },
    {
      name: 'Arctic Monkeys',
      information:
        'Arctic Monkeys are an English rock band formed in Sheffield on 14 August 2002.',
      image: 'fixtures/arcticMonkeys.jpg',
    }
  );

  await db.close();
};

void run().catch(console.error);
