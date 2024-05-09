import { Schema, Types, model } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => Artist.findById(id),
        message: 'Artist does not exist.',
      },
    },
    year: {
      type: Number,
      required: true,
    },
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

const Album = model('Album', AlbumSchema);

export default Album;
