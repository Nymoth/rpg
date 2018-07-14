import Game from './game';
import config from './config';
import DOMCanvasRenderer from './domCanvasRenderer';

(async () => {
  const renderer = new DOMCanvasRenderer(document, config.WIEWPORT_WIDTH, config.WIEWPORT_HEIGHT);
  await renderer.loadImages();
  const game = new Game(renderer, config);

  const charData = {
    position: {
      x: 0,
      y: 0,
      dir: 'down'
    },
    vitals: {
      curHealth: 100,
      totalHealth: 100,
      curMana: 100,
      totalMana: 100
    },
    stats: {
      physDmg: 10,
      physDef: 0,
      magicDmg: 10,
      magicDef: 0
    },
    progression: {
      level: 1,
      currentExp: 0,
      expToNextLvl: 1000
    },
    capabilities: {
      canMoveThroughWater: false
    }
  };

  game.loadCharacter(charData);
  game.loadMap('test');
  game.start();
})();
