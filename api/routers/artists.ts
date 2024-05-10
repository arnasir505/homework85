import express from 'express';
import Artist from '../models/Artist';
import { imagesUpload } from '../multer';
import mongoose, { mongo } from 'mongoose';
import { ArtistFields } from '../types';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const artistData: ArtistFields = {
        name: req.body.name,
        information: req.body.information || null,
        image: req.file ? req.file.filename : null,
        isPublished: false,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        return res.status(422).send({ error: 'This artist already exists.' });
      }

      next(error);
    }
  }
);

artistsRouter.get(
  '/',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const role = req.user?.role;
      if (!role) {
        return res.sendStatus(403);
      }
      if (role === 'admin') {
        const artists = await Artist.find();
        return res.send(artists);
      }
      const artists = await Artist.find({ isPublished: true });
      return res.send(artists);
    } catch (error) {
      next(error);
    }
  }
);

artistsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const artist = await Artist.findById(id);
      if (!artist) {
        return res.status(404).send({ error: 'Not Found' });
      }
      artist.togglePublished();
      await artist.save();
      return res.send(artist);
    } catch (error) {
      next(error);
    }
  }
);

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      return res.status(404).send({ error: 'Not Found' });
    }
    return res.send({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
});

export default artistsRouter;
