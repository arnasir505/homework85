export interface Artist {
  _id: string;
  name: string;
  information: string;
  image: string;
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
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  duration: string;
  position: number;
}