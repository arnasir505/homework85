import express from 'express';
import Artist from '../models/Artist';
import { imagesUpload } from '../multer';
import { mongo } from 'mongoose';
import { ArtistMutation } from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.body.name) {
        return res.status(422).send({ error: 'Artist name is required!' });
      }

      const artistData: ArtistMutation = {
        name: req.body.name,
        information: req.body.information || null,
        image: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongo.MongoServerError && error.code === 11000) {
        return res.status(422).send({ error: 'Artist name should be unique!' });
      }
      next(error);
    }
  }
);

export default artistsRouter;
