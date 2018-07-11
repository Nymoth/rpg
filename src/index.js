import Game from './game';
import config from './config';
import DOMCanvasRenderer from './domCanvasRenderer';

const renderer = new DOMCanvasRenderer(document, config.WIEWPORT_WIDTH, config.WIEWPORT_HEIGHT);
const game = new Game(renderer, config);
game.loadCharacter();
game.loadMap('test');
game.start();
