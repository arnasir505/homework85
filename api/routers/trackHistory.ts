import express from 'express';
import User from '../models/User';
import { TrackHistoryMutation } from '../types';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    
    const date = new Date();

    const trackHistoryData: TrackHistoryMutation = {
      user: req.user?.id,
      track: req.body.track,
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

export default trackHistoryRouter;
