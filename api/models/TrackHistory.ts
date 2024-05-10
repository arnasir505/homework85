import { Schema, Types, model } from 'mongoose';
import User from './User';
import Track from './Track';
import Artist from './Artist';

const TrackHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      validate: {
        validator: async (id: Types.ObjectId) => User.findById(id),
        message: 'User does not exist.',
      },
    },
    track: {
      type: Schema.Types.ObjectId,
      ref: 'Track',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => Track.findById(id),
        message: 'Track does not exist.',
      },
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => Artist.findById(id),
        message: 'Artist does not exist',
      },
    },
    datetime: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
