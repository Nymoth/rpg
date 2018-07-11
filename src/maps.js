import { Collection, RawMap } from './types';

const maps: Collection<RawMap> = {
  test: {
    b: 'default',
    l: [
      {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        m: 'grass'
      },
      {
        x: 20,
        y: 10,
        w: 2,
        h: 10,
        m: 'road'
      },
      {
        x: 22,
        y: 18,
        w: 10,
        h: 2,
        m: 'road'
      },
      {
        x: 23,
        y: 5,
        w: 10,
        h: 11,
        m: 'water'
      }
    ]
  }
};

export default maps;
