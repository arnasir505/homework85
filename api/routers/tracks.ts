import express from 'express';
import Track from '../models/Track';
import mongoose from 'mongoose';
import { TrackMutation } from '../types';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;

    if (albumId) {
      if (!mongoose.Types.ObjectId.isValid(albumId.toString())) {
        return res.status(422).send({ error: 'Invalid album!' });
      }
      const tracks = await Track.find({ album: albumId.toString() });
      return res.send(tracks);
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.album || !req.body.duration) {
      return res
        .status(422)
        .send({ error: 'Track title, album and duration is required!' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.album)) {
      return res.status(422).send({ error: 'Invalid album!' });
    }

    const trackData: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (error) {
    next(error);
  }
});

export default tracksRouter;
