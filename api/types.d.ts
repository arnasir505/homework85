import { ObjectId } from "mongoose";

export interface ArtistFields {
  name: string;
  information: string | null;
  image: string | null;
  isPublished: boolean;
}

export interface AlbumFields {
  title: string;
  artist: ObjectId;
  year: number;
  image: string | null;
  isPublished: boolean;
}

export interface TrackFields {
  title: string;
  album: ObjectId;
  duration: string;
  position: number;
  isPublished: boolean;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface TrackHistoryFields {
  user: string;
  track: string;
  artist: string;
  datetime: string;
}
