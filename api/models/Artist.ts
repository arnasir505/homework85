import { Schema, model } from 'mongoose';

const ArtistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    information: String,
    image: String || null,
  },
  {
    versionKey: false,
  }
);

const Artist = model('Artist', ArtistSchema);

export default Artist;
