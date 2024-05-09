export interface Artist {
  _id: string;
  name: string;
  information: string;
  image: string;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  title: string;
  artist: {
    _id: string;
    name: string;
  };
  year: number;
  image: string;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  duration: string;
  position: number;
  isPublished: boolean;
}

export interface TracksByAlbum {
  album: {
    title: string;
    artist: {
      name: string;
    };
  };
  tracks: Track[];
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface HistoryTrack {
  _id: string;
  track: {
    _id: string;
    title: string;
  };
  artist: {
    _id: string;
    name: string;
  };
  datetime: string;
}
