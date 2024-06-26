export interface Artist {
  _id: string;
  name: string;
  information: string | null;
  image: string | null;
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
  image: string | null;
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
  email: string;
  displayName: string;
  avatar?: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar?: string;
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
