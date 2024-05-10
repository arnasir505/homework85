import express from 'express';
import Album from '../models/Album';
import { imagesUpload } from '../multer';
import { AlbumFields } from '../types';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
const albumsRouter = express.Router();

albumsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const albumData: AlbumFields = {
        title: req.body.title,
        artist: req.body.artist,
        year: parseInt(req.body.year),
        image: req.file ? req.file.filename : null,
        isPublished: false,
      };

      const album = new Album(albumData);
      await album.save();

      return res.send(album);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }
      next(error);
    }
  }
);

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;

    if (artistId) {
      if (!mongoose.Types.ObjectId.isValid(artistId.toString())) {
        return res.status(422).send({ error: 'Invalid artist!' });
      }
      const albums = await Album.find({ artist: artistId.toString() })
        .populate('artist', 'name')
        .sort({ year: 'desc' });
      return res.send(albums);
    }
    const albums = await Album.find().sort({title: 'asc'});
    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const album = await Album.findOne({ _id: id }).populate(
      'artist',
      'name information image'
    );
    return res.send(album);
  } catch (error) {
    next(error);
  }
});

albumsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const album = await Album.findById(id);
      if (!album) {
        return res.status(404).send({ error: 'Not Found' });
      }
      album.togglePublished();
      await album.save();
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }
);

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).send({ error: 'Not Found' });
    }
    return res.send({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;
