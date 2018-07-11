export default class Character {
  constructor(x: number, y: number, dir: string) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.canMoveThroughWater = false;
  }

  move(where: string) {
    switch (where) {
      case 'up':
        this.dir = 'up';
        this.y--;
        break;
      case 'down':
        this.dir = 'down';
        this.y++;
        break;
      case 'left':
        this.dir = 'left';
        this.x--;
        break;
      case 'right':
        this.dir = 'right';
        this.x++;
        break;
      default: break;
    }
  }
}
