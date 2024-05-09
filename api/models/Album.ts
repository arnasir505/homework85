import { Model, Schema, Types, model } from 'mongoose';
import Artist from './Artist';
import { AlbumFields } from '../types';

interface AlbumMethods {
  togglePublished(): void;
}

type AlbumModel = Model<AlbumFields, {}, AlbumMethods>;

const AlbumSchema = new Schema<AlbumFields, AlbumModel>(
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

AlbumSchema.method('togglePublished', function () {
  this.isPublished = !this.isPublished;
});

const Album = model<AlbumFields, AlbumModel>('Album', AlbumSchema);

export default Album;
