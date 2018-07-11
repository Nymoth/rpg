import { Collection, Material } from './types';

const materials: Collection<Material> = {
  default: {
    bg: '#000000',
    bh: {
      enter: () => false
    }
  },
  grass: {
    bg: '#37ad60'
  },
  road: {
    bg: '#af6413'
  },
  water: {
    bg: '#4c96e0',
    bh: {
      enter: (ch: Character) => ch.canMoveThroughWater
    }
  }
};

export default materials;
