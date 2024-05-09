import { Schema, Types, model } from 'mongoose';
import Album from './Album';

const TrackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => Album.findById(id),
        message: 'Album does not exist.',
      },
    },
    duration: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
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

const Track = model('Track', TrackSchema);

export default Track;
