var winStateBlue = {

	create: function create(){
		game.add.sprite(0,0, 'winblue');

		//set spacebar key
		menuCursors = game.input.keyboard.createCursorKeys();
		menuSpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		WinCounttext1 = game.add.text(10, 10, "Games Won: ", { fontSize: '32px', fill: '#FFF' });
		WinCounttext2 = game.add.text(10, 60, "Blue " + blueWinCount, { fontSize: '32px', fill: '#FFF' });
		WinCounttext3 = game.add.text(10, 110, "Red " + redWinCount , { fontSize: '32px', fill: '#FFF' });

	},
	update: function update(){
		//if spcaebar is pressed go to gamestate
		if (menuSpaceKey.isDown) {
			game.state.start("menu");
			score = 0;
			score2 = 0;
		}
	}
}