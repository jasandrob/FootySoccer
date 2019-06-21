var loadState = {
    preload: function(){
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        game.load.image('menu', 'assets/menu.JPG');
        game.load.image('sky', 'assets/newBackground.JPG');
        game.load.image('goalpostLeft', 'assets/goalpostleft1.png');
	    game.load.image('goalpostRight', 'assets/goalpostright.png');
        game.load.image('ball', 'assets/soccerball.png');
	    game.load.spritesheet('dude', 'assets/dude1-1.PNG', 32, 48);
	    game.load.spritesheet('dude2', 'assets/dude2-2.PNG', 32, 48);
	    game.load.image('ground', 'assets/realgrass.JPG');
	    game.load.image('blocker', 'assets/rect1.png');
	    game.load.image('scorer', 'assets/rect2.png');
	    game.load.image('scoreboard', 'assets/scoreboard.JPG');
        game.load.image('instructbackground', 'assets/instructionbackground.png');
        game.load.image('winblue', 'assets/bluewins1.JPG');
        game.load.image('winred', 'assets/redwins1.JPG');
    },
    create: function() {
        game.state.start('menu');
    }

}