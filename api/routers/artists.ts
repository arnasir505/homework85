import express from 'express';
import Artist from '../models/Artist';
import { imagesUpload } from '../multer';
import mongoose, { mongo } from 'mongoose';
import { ArtistMutation } from '../types';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const artistData: ArtistMutation = {
        name: req.body.name,
        information: req.body.information || null,
        image: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }

      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        return res.status(422).send({ error: 'Artist name should be unique!' });
      }

      next(error);
    }
  }
);

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    next(error);
  }
});

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
