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

export type CharacterPosititon = {
  x: number;
  y: number;
  dir: string;
}

export type CharacterVitals = {
  curHealth: number;
  totalHealth: number;
  curMana: number;
  totalMana: number;
}

export type CharacterStats = {
  physDmg: number;
  physDef: number;
  magicDmg: number;
  magicDef: number;
}

export type CharacterProgression = {
  level: number;
  currentExp: number;
  expToNextLvl: number;
}

export type ChataracterCapabilities = {
  canMoveThroughWater: boolean;
}

export type CharacterData = {
  position: CharacterPosititon;
  vitals: CharacterVitals;
  stats: CharacterStats;
  progression: CharacterProgression;
  capabilities: ChataracterCapabilities;
}

export interface Renderer {
  renderMap(Tile[][], number, number): void;
  renderCharacter(string): boolean;
  bindUserInteractions(UserInteractions): void;
}
