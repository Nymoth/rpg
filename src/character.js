export default class Character {
  constructor(x: number, y: number, dir: string) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.canMoveThroughWater = false;
  }

  move(where: string): boolean {
    switch (where) {
      case 'up':
        this.y--;
        return true;
      case 'down':
        this.y++;
        return true;
      case 'left':
        this.x--;
        return true;
      case 'right':
        this.x++;
        return true;
      default: break;
    }
    return false;
  }

  changeDirection(dir): boolean {
    if (this.dir !== dir) {
      this.dir = dir;
      return true;
    }
    return false;
  }
}
