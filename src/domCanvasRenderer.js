import config from './config';
import { UserInteractions, Tile, Renderer } from './types';

export default class DOMCanvasRenderer implements Renderer {
  constructor(document: Document, width: number, height: number) {
    this.document = document;
    this.width = width;
    this.height = height;
    this.images = {};

    this.canvasContainer = this._bootstrapGlobal();
    this.mapContext = this._createCanvas();
    this.characterContext = this._createCanvas(100);
  }

  async loadImages(): Promise<void> {
    const sources = [
      'wizard.png'
    ];
    const imgs = sources.map((name: string) => this._loadImage(`/assets/img/${name}`));
    this.images = (await Promise.all(imgs))
      .map((img, i) => ({
        name: sources[i].split('.')[0],
        img
      }))
      // eslint-disable-next-line no-param-reassign
      .reduce((a, { name, img }) => { a[name] = img; return a; }, {});
  }

  renderMap(tiles: Tile[][], tileWidth: number, tileHeight: number) {
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        this._drawTile(tiles[i][j], i, j, tileWidth, tileHeight);
      }
    }
  }

  renderCharacter(dir: string) {
    let sx;
    let sy;
    switch (dir) {
      case 'up':
        sx = 25;
        sy = 0;
        break;
      case 'down':
        sx = 0;
        sy = 25;
        break;
      case 'left':
        sx = 25;
        sy = 25;
        break;
      case 'right':
        sx = 0;
        sy = 0;
        break;
      default: return;
    }
    const cx = (config.WIEWPORT_WIDTH / 2) - 12.5;
    const cy = (config.WIEWPORT_HEIGHT / 2) - 12.5;
    this.characterContext.clearRect(cx, cy, 25, 25);
    this.characterContext.drawImage(this.images.wizard, sx, sy, 25, 25, cx, cy, 25, 25);
  }

  bindUserInteractions(actions: UserInteractions) {
    const body = this.document.getElementsByTagName('body')[0];
    body.onkeydown = ({ keyCode }) => {
      switch (keyCode) {
        case 38:
        case 87:
          actions.moveUp();
          break;
        case 40:
        case 83:
          actions.moveDown();
          break;
        case 37:
        case 65:
          actions.moveLeft();
          break;
        case 39:
        case 68:
          actions.moveRight();
          break;
        default: break;
      }
    };

    body.onkeyup = () => {
      actions.releaseMovement();
    };
  }

  _bootstrapGlobal(): HTMLDivElement {
    const body = document.getElementsByTagName('body')[0];
    const canvasContainer = document.createElement('div');
    body.style.margin = '0';
    body.style.background = '#333';
    body.appendChild(canvasContainer);
    canvasContainer.style.width = `${this.width}px`;
    canvasContainer.style.height = `${this.height}px`;
    canvasContainer.style.margin = `-${this.height / 2}px auto 0`;
    canvasContainer.style.transform = 'translateY(50vh)';
    canvasContainer.style.background = '#fff';
    canvasContainer.style.position = 'relative';
    return canvasContainer;
  }

  _createCanvas(layer = 0): CanvasRenderingContext2D {
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.zIndex = layer;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    this.canvasContainer.appendChild(canvas);
    return canvas.getContext('2d');
  }


  _loadImage(src: string): Promise<Image> {
    return new Promise((res) => {
      const img = new Image();
      img.src = src;
      img.onload = () => res(img);
    });
  }

  _drawTile(tile: Tile, x: number, y: number, w: number, h: number) {
    this.mapContext.fillStyle = tile.m.bg;
    this.mapContext.fillRect(x * w, y * h, w, h);
  }
}
