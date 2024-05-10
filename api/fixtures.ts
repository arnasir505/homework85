import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';

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

  const [theWeeknd, arcticMonkeys, chaseAtlantic] = await Artist.create(
    {
      name: 'The Weeknd',
      information:
        'Canadian singer and songwriter. He is known for his unconventional music production, artistic reinventions, and signature use of the falsetto register. In 2009, Tesfaye expressed his interest in music when he began anonymously releasing music on YouTube',
      image: 'images/theWeeknd.jpg',
      isPublished: true,
    },
    {
      name: 'Arctic Monkeys',
      information:
        'Arctic Monkeys are an English rock band formed in Sheffield on 14 August 2002.',
      image: 'images/arcticMonkeys.jpg',
      isPublished: true,
    },
    {
      name: 'Chase Atlantic',
      information:
        'Australian R&B band and production trio from Cairns, Queensland, formed in 2014.',
      image: 'images/chaseAtlantic.jpg',
      isPublished: false,
    }
  );

  const [theHighlights, afterHours, am, favouriteWorstNightmare, nostalgia] =
    await Album.create(
      {
        title: 'The Highlights',
        artist: theWeeknd._id,
        year: 2021,
        image: 'images/theHighlights.jpg',
        isPublished: true,
      },
      {
        title: 'After Hours',
        artist: theWeeknd._id,
        year: 2020,
        image: 'images/afterHours.jpg',
        isPublished: true,
      },
      {
        title: 'AM',
        artist: arcticMonkeys._id,
        year: 2013,
        image: 'images/am.jpg',
        isPublished: true,
      },
      {
        title: 'Favourite Worst Nightmare',
        artist: arcticMonkeys._id,
        year: 2007,
        image: 'images/favouriteWorstNightmare.jpg',
        isPublished: true,
      },
      {
        title: 'Nostalgia',
        artist: chaseAtlantic._id,
        year: 2015,
        image: 'images/nostalgia.jpg',
        isPublished: false,
      }
    );

  await Track.create(
    {
      title: 'Starboy',
      album: theHighlights._id,
      duration: '3:50',
      position: 1,
      isPublished: true,
    },
    {
      title: 'Pray For Me',
      album: theHighlights._id,
      duration: '3:31',
      position: 2,
      isPublished: true,
    },
    {
      title: 'Often',
      album: theHighlights._id,
      duration: '4:09',
      position: 3,
      isPublished: true,
    },
    {
      title: 'The Hills',
      album: theHighlights._id,
      duration: '4:02',
      position: 4,
      isPublished: true,
    },
    {
      title: 'Die For You',
      album: theHighlights._id,
      duration: '4:20',
      position: 5,
      isPublished: true,
    },
    {
      title: 'Blinding Lights',
      album: afterHours._id,
      duration: '3:20',
      position: 1,
      isPublished: true,
    },
    {
      title: 'In Your Eyes',
      album: afterHours._id,
      duration: '3:57',
      position: 2,
      isPublished: true,
    },
    {
      title: 'Alone Again',
      album: afterHours._id,
      duration: '4:10',
      position: 3,
      isPublished: true,
    },
    {
      title: 'Too Late',
      album: afterHours._id,
      duration: '3:59',
      position: 4,
      isPublished: true,
    },
    {
      title: 'Hardest To Love',
      album: afterHours._id,
      duration: '3:31',
      position: 5,
      isPublished: true,
    },
    {
      title: 'Do I Wanna Know?',
      album: am._id,
      duration: '4:32',
      position: 1,
      isPublished: true,
    },
    {
      title: 'R U Mine?',
      album: am._id,
      duration: '3:21',
      position: 2,
      isPublished: true,
    },
    {
      title: 'Snap Out Of It',
      album: am._id,
      duration: '3:13',
      position: 3,
      isPublished: true,
    },
    {
      title: 'Knee Socks',
      album: am._id,
      duration: '4:17',
      position: 4,
      isPublished: true,
    },
    {
      title: 'I Wanna Be Yours',
      album: am._id,
      duration: '3:03',
      position: 5,
      isPublished: true,
    },
    {
      title: 'Brianstorm',
      album: favouriteWorstNightmare._id,
      duration: '2:52',
      position: 1,
      isPublished: true,
    },
    {
      title: 'Balaclava',
      album: favouriteWorstNightmare._id,
      duration: '2:51',
      position: 2,
      isPublished: true,
    },
    {
      title: 'Teddy Picker',
      album: favouriteWorstNightmare._id,
      duration: '2:45',
      position: 3,
      isPublished: true,
    },
    {
      title: 'Old Yellow Bricks',
      album: favouriteWorstNightmare._id,
      duration: '3:13',
      position: 4,
      isPublished: true,
    },
    {
      title: '505',
      album: favouriteWorstNightmare._id,
      duration: '4:13',
      position: 5,
      isPublished: true,
    },
    {
      title: 'Roxanne',
      album: nostalgia._id,
      duration: '3:52',
      position: 1,
      isPublished: false,
    },
    {
      title: 'Meddle About',
      album: nostalgia._id,
      duration: '3:23',
      position: 2,
      isPublished: false,
    },
    {
      title: 'Friends',
      album: nostalgia._id,
      duration: '3:50',
      position: 3,
      isPublished: false,
    }
  );

  await User.create(
    {
      username: 'Admin',
      password: 'qwerty123',
      token: crypto.randomUUID(),
      role: 'admin',
    },
    {
      username: 'User',
      password: 'qwerty1234',
      token: crypto.randomUUID(),
      role: 'user',
    }
  );

  await db.close();
};

void run().catch(console.error);
