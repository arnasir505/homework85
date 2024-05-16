import express from 'express';
import Track from '../models/Track';
import mongoose from 'mongoose';
import { TrackFields } from '../types';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    if (!req.body.album) {
      return res
        .status(422)
        .send({ errors: { album: { message: 'Path `album` is required.' } } });
    }
    let position = 1;
    const tracks = await Track.find({ album: req.body.album }).sort({
      position: 'desc',
    });

    if (tracks.length > 0) {
      position = tracks[0].position + 1;
    }

    const trackData: TrackFields = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      position: position,
      isPublished: false,
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
      const tracks = await Track.find({
        album: albumId.toString(),
        isPublished: true,
      }).sort({
        position: 'asc',
      });
      const album = await Album.findById(albumId, {
        year: 0,
        image: 0,
        isPublished: 0,
      }).populate('artist', 'name');
      return res.send({ album, tracks });
    }

    return res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

tracksRouter.get(
  '/admin',
  auth,
  permit('admin'),
  async (_req, res, next) => {
    try {
      const tracks = await Track.find().sort({ album: 'desc' });
      return res.send(tracks);
    } catch (error) {
      next(error)
    }
  }
);

tracksRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const track = await Track.findById(id);
      if (!track) {
        return res.status(404).send({ error: 'Not Found' });
      }
      track.togglePublished();
      await track.save();
      return res.send(track);
    } catch (error) {
      next(error);
    }
  }
);

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const track = await Track.findByIdAndDelete(id);
    if (!track) {
      return res.status(404).send({ error: 'Not Found' });
    }
    return res.send({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
});

export default tracksRouter;
