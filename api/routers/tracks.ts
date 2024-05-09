import express from 'express';
import Track from '../models/Track';
import mongoose from 'mongoose';
import { TrackMutation } from '../types';
import Album from '../models/Album';
import auth from '../middleware/auth';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    let position = 1;
    const tracks = await Track.find({album: req.body.album}).sort({position: 'desc'});

    if (tracks.length > 0) {
      position = tracks[0].position + 1;
    }

    const trackData: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      position: position,
    };

    const track = new Track(trackData);
    await track.save();

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;

    if (albumId) {
      if (!mongoose.Types.ObjectId.isValid(albumId.toString())) {
        return res.status(422).send({ error: 'Invalid album!' });
      }
      const tracks = await Track.find({ album: albumId.toString() }).sort({
        position: 'asc',
      });
      const album = await Album.findById(albumId).populate('artist', 'name');
      return res.send({ album, tracks });
    }
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

export default tracksRouter;
