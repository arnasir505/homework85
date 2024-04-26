import express from 'express';
import User from '../models/User';
import { TrackHistoryMutation } from '../types';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(400).send({ error: 'Token not provided' });
    }

    const [_, token] = headerValue.split(' ');

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(401).send({ error: 'Invalid token' });
    }

    const date = new Date();

    const trackHistoryData: TrackHistoryMutation = {
      user: user.id,
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
