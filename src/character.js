import { CharacterData } from './types';

export default class Character {
  constructor(data?: CharacterData) {
    if (this.data) {
      this.load(data);
    } else {
      this.position = {
        x: 0,
        y: 0,
        dir: 'down'
      };
      this.vitals = {
        curHealth: 0,
        totalHealth: 0,
        curMana: 0,
        totalMana: 0
      };
      this.stats = {
        physDmg: 0,
        physDef: 0,
        magicDmg: 0,
        magicDef: 0
      };
      this.progression = {
        level: 0,
        currentExp: 0,
        expToNextLvl: 0
      };
      this.capabilities = {
        canMoveThroughWater: false
      };
    }
  }

  load(data: CharacterData) {
    Object.keys(data).forEach((dataType: string) => {
      this[dataType] = { ...data[dataType] };
    });
  }

  exportData(): CharacterData {
    const dataPoints = ['position', 'vitals', 'stats', 'progression', 'capabilities'];
    // eslint-disable-next-line no-param-reassign
    return dataPoints.reduce((o, dataPoint: string) => { o[dataPoint] = { ...this[dataPoint] }; return o; }, {});
  }

  move(where: string): boolean {
    switch (where) {
      case 'up':
        this.position.y--;
        return true;
      case 'down':
        this.position.y++;
        return true;
      case 'left':
        this.position.x--;
        return true;
      case 'right':
        this.position.x++;
        return true;
      default: break;
    }
    return false;
  }

  changeDirection(dir): boolean {
    if (this.position.dir !== dir) {
      this.position.dir = dir;
      return true;
    }
    return false;
  }
}
