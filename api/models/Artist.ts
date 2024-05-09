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
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Artist = model('Artist', ArtistSchema);

export default Artist;
