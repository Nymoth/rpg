import { RawMap, RawMapLayer, ParsedMap, Renderer, Collection } from './types';
import Character from './character';
import maps from './maps';
import materials from './materials';

export default class Game {
  constructor(renderer: Renderer, config: Collection<any>) {
    this.renderer = renderer;
    this.config = config;

    this.state = {
      TRAVEL: false,
      MOV: null
    };
    this.timers = {
      MOV: 0
    };

    renderer.bindUserInteractions({
      moveUp: () => { this.state.MOV = 'up'; },
      moveDown: () => { this.state.MOV = 'down'; },
      moveLeft: () => { this.state.MOV = 'left'; },
      moveRight: () => { this.state.MOV = 'right'; },
      releaseMovement: () => { this.state.MOV = null; }
    });
  }

  loadMap(mapName: string) {
    const rawMap = maps[mapName];
    this.map = this._parseMap(rawMap);
  }

  loadCharacter() {
    this.character = new Character(0, 0, 'down');
  }

  start() {
    this.state.TRAVEL = true;
    if (this.map && this.character) {
      this._processFrame();
    }
  }

  _processFrame() {
    if (this.state.TRAVEL) {
      if (this.timers.MOV === 0) {
        switch (this.state.MOV) {
          case 'up':
            if (this._canMoveTo(this.character.x, this.character.y - 1)) {
              this.character.move('up');
            }
            break;
          case 'down':
            if (this._canMoveTo(this.character.x, this.character.y + 1)) {
              this.character.move('down');
            }
            break;
          case 'left':
            if (this._canMoveTo(this.character.x - 1, this.character.y)) {
              this.character.move('left');
            }
            break;
          case 'right':
            if (this._canMoveTo(this.character.x + 1, this.character.y)) {
              this.character.move('right');
            }
            break;
          default: break;
        }
        this.timers.MOV = 10;
      }

      Object.keys(this.timers).forEach((key: string) => {
        if (this.timers[key] > 0) {
          this.timers[key]--;
        }
      });
    }

    const tileWidth = Math.ceil(this.config.WIEWPORT_WIDTH / this.config.H_TILES);
    const tileHeight = Math.ceil(this.config.WIEWPORT_HEIGHT / this.config.V_TILES);
    const middleX = this.character.x - Math.floor(this.config.H_TILES / 2);
    const middleY = this.character.y - Math.floor(this.config.V_TILES / 2);
    const visibleMap = this._getVisiblePortion(middleX, middleY);
    this.renderer.renderMap(visibleMap.tiles, tileWidth, tileHeight);

    setTimeout(() => requestAnimationFrame(() => this._processFrame()), 1000 / 60);
  }

  _parseMap(rawMap: RawMap): ParsedMap {
    const tiles = [];
    rawMap.l.forEach((layer: RawMapLayer) => {
      for (let i = layer.x; i < layer.w + layer.x; i++) {
        if (!tiles[i]) {
          tiles.push([]);
        }
        for (let j = layer.y; j < layer.h + layer.y; j++) {
          tiles[i][j] = {
            x: i,
            y: j,
            m: materials[layer.m] || materials.default
          };
        }
      }
    });
    return {
      tiles,
      base: {
        bg: (materials[rawMap.b] || materials.default).bg,
        bh: {
          enter: () => false
        }
      }
    };
  }

  _getVisiblePortion(x: number, y: number): ParsedMap {
    const tiles = [];
    for (let i = 0; i < this.config.H_TILES; i++) {
      tiles.push([]);
      for (let j = 0; j < this.config.V_TILES; j++) {
        tiles[i][j] = this.map.tiles[i + x] && this.map.tiles[i + x][j + y] ? this.map.tiles[i + x][j + y] : {
          x: i + x,
          y: j + y,
          m: this.map.base
        };
      }
    }
    return {
      base: this.map.base,
      tiles
    };
  }

  _canMoveTo(x: number, y: number) {
    if (this.map.tiles[x] && this.map.tiles[x][y]) {
      return !this.map.tiles[x][y].m.bh || this.map.tiles[x][y].m.bh.enter(this);
    }
    return false;
  }
}
