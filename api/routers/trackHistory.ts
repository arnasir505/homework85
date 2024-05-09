import express from 'express';
import { TrackHistoryMutation } from '../types';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Album from '../models/Album';
import Track from '../models/Track';
import Artist from '../models/Artist';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const date = new Date();
    const track = await Track.findOne({_id: req.body.track});
    const album = await Album.findOne({_id: track?.album});
    const artist = await Artist.findOne({_id: album?.artist});

    const trackHistoryData: TrackHistoryMutation = {
      user: req.user?.id,
      track: req.body.track,
      artist: artist?.id,
      datetime: date.toISOString(),
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const tracks = await TrackHistory.find({user: req.user?._id}, {user: 0}).populate('track artist', 'title name').sort({datetime: 'desc'});

    return res.send(tracks);
  } catch (error) {
    next(error)
  }
})

export default trackHistoryRouter;
