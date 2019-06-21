var game = new Phaser.Game(1400, 600, Phaser.AUTO, '');

game.state.add("boot", bootState);
game.state.add("load", loadState);
game.state.add("game", gameState);
game.state.add("menu", menuState);
game.state.add("winblue", winStateBlue);
game.state.add("winred", winStateRed);
game.state.add("instructions", instructState);

game.state.start("boot");