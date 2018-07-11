import Character from './character';

export type Collection<T> = { (name: string): T };

export type Material = {
  bg: string;
  bh: {
    enter: (ch: Character) => boolean
  }
}

export type RawMapLayer = {
  x: number;
  y: number;
  w: number;
  h: number;
  m: string;
}

export type RawMap = {
  b: string;
  l: RawMapLayer[];
}

export type Tile = {
  x: number;
  y: number;
  m: Material;
}

export type ParsedMap = {
  base: Material;
  tiles: Tile[][];
}

export type UserInteractions = {
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  releaseMovement: () => void;
}

export interface Renderer {
  renderMap(Tile[][], number, number): void;
  bindUserInteractions(UserInteractions): void;
}
