import { Model, Schema, model } from 'mongoose';
import { ArtistFields } from '../types';

interface ArtistMethods {
  togglePublished(): void;
}

type ArtistModel = Model<ArtistFields, {}, ArtistMethods>;

const ArtistSchema = new Schema<ArtistFields, ArtistModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    information: String || null,
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

ArtistSchema.method('togglePublished', function () {
  this.isPublished = !this.isPublished;
});

const Artist = model<ArtistFields, ArtistModel>('Artist', ArtistSchema);

export default Artist;
