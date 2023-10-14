type MarvelApiCharacterItem = {
  resourceURI: string;
  name: string;
  type?: "cover" | "interiorStory" | "pinup" | "promo" | "backcovers";
};

type MarvelApiCharacterUrl = {
  type: "detail" | "wiki" | "comiclink";
  url: string;
};

export type MarvelApiCharacter = {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: MarvelApiCharacterItem[];
    returned: number;
  };
  series: {
    available: number;
    collectionURI: string;
    items: MarvelApiCharacterItem[];
    returned: number;
  };
  stories: {
    available: number;
    collectionURI: string;
    items: MarvelApiCharacterItem[];
    returned: number;
  };
  events: {
    available: number;
    collectionURI: string;
    items: MarvelApiCharacterItem[];
    returned: number;
  };
  urls: MarvelApiCharacterUrl[];
};

export type MarvelCharacter = {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  created_at?: string;
  victories?: number;
  lost?: number;
};
