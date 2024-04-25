import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

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

const collections: string[] = [
  'albums',
  'artists',
  'trackhistories',
  'tracks',
  'users',
];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [theWeeknd, arcticMonkeys] = await Artist.create(
    {
      name: 'The Weeknd',
      information:
        'Canadian singer and songwriter. He is known for his unconventional music production, artistic reinventions, and signature use of the falsetto register. In 2009, Tesfaye expressed his interest in music when he began anonymously releasing music on YouTube',
      image: 'fixtures/theWeeknd.jpg',
    },
    {
      name: 'Arctic Monkeys',
      information:
        'Arctic Monkeys are an English rock band formed in Sheffield on 14 August 2002.',
      image: 'fixtures/arcticMonkeys.jpg',
    }
  );

  const [theHighlights, afterHours, am, favouriteWorstNightmare] =
    await Album.create(
      {
        title: 'The Highlights',
        artist: theWeeknd._id,
        year: 2021,
        image: 'fixtures/theHighlights.jpg',
      },
      {
        title: 'After Hours',
        artist: theWeeknd._id,
        year: 2020,
        image: 'fixtures/afterHours.jpg',
      },
      {
        title: 'AM',
        artist: arcticMonkeys._id,
        year: 2013,
        image: 'fixtures/am.jpg',
      },
      {
        title: 'Favourite Worst Nightmare',
        artist: arcticMonkeys._id,
        year: 2007,
        image: 'fixtures/favouriteWorstNightmare.jpg',
      }
    );

  await Track.create(
    {
      title: 'Starboy',
      album: theHighlights._id,
      duration: '3:50',
      position: 1,
    },
    {
      title: 'Pray For Me',
      album: theHighlights._id,
      duration: '3:31',
      position: 2,
    },
    {
      title: 'Often',
      album: theHighlights._id,
      duration: '4:09',
      position: 3,
    },
    {
      title: 'The Hills',
      album: theHighlights._id,
      duration: '4:02',
      position: 4,
    },
    {
      title: 'Die For You',
      album: theHighlights._id,
      duration: '4:20',
      position: 5,
    },
    {
      title: 'Blinding Lights',
      album: afterHours._id,
      duration: '3:20',
      position: 1,
    },
    {
      title: 'In Your Eyes',
      album: afterHours._id,
      duration: '3:57',
      position: 2,
    },
    {
      title: 'Alone Again',
      album: afterHours._id,
      duration: '4:10',
      position: 3,
    },
    {
      title: 'Too Late',
      album: afterHours._id,
      duration: '3:59',
      position: 4,
    },
    {
      title: 'Hardest To Love',
      album: afterHours._id,
      duration: '3:31',
      position: 5,
    },
    {
      title: 'Do I Wanna Know?',
      album: am._id,
      duration: '4:32',
      position: 1,
    },
    {
      title: 'R U Mine?',
      album: am._id,
      duration: '3:21',
      position: 2,
    },
    {
      title: 'Snap Out Of It',
      album: am._id,
      duration: '3:13',
      position: 3,
    },
    {
      title: 'Knee Socks',
      album: am._id,
      duration: '4:17',
      position: 4,
    },
    {
      title: 'I Wanna Be Yours',
      album: am._id,
      duration: '3:03',
      position: 5,
    },
    {
      title: 'Brianstorm',
      album: favouriteWorstNightmare._id,
      duration: '2:52',
      position: 1,
    },
    {
      title: 'Balaclava',
      album: favouriteWorstNightmare._id,
      duration: '2:51',
      position: 2,
    },
    {
      title: 'Teddy Picker',
      album: favouriteWorstNightmare._id,
      duration: '2:45',
      position: 3,
    },
    {
      title: 'Old Yellow Bricks',
      album: favouriteWorstNightmare._id,
      duration: '3:13',
      position: 4,
    },
    {
      title: '505',
      album: favouriteWorstNightmare._id,
      duration: '4:13',
      position: 5,
    }
  );

  await db.close();
};

void run().catch(console.error);
