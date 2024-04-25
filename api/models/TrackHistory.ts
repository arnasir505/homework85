import { Schema, Types, model } from 'mongoose';
import User from './User';
import Track from './Track';

const TrackHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
    datetime: String,
  },
  {
    versionKey: false,
  }
);

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
