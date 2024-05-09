export interface ArtistMutation {
  name: string;
  information: string | null;
  image: string | null;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  year: string;
  image: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  position: number;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface TrackHistoryMutation {
  user: string;
  track: string;
  artist: string;
  datetime: string;
}
