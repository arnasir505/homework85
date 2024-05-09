import { Model, Schema, Types, model } from 'mongoose';
import Album from './Album';
import { TrackFields } from '../types';

interface TrackMethods {
  togglePublished(): void;
}

type TrackModel = Model<TrackFields, {}, TrackMethods>;

const TrackSchema = new Schema<TrackFields, TrackModel>(
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

TrackSchema.method('togglePublished', function () {
  this.isPublished = !this.isPublished;
});

const Track = model<TrackFields, TrackModel>('Track', TrackSchema);

export default Track;
