var instructState = {
	
    create: function create(){
		
		game.add.sprite(0,0, 'instructbackground');

		menuCursors = game.input.keyboard.createCursorKeys();
		iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);

		text1 = game.add.text(10, 10, "Instructions ", { fontSize: '32px', fill: '#FFF' });
		text2 = game.add.text(10, 55, "Controls:", { fontSize: '32px', fill: '#FFF' });
		text3 = game.add.text(10, 80, "Press WASD to control player BLUE ", { fontSize: '32px', fill: '#FFF' });
		text4 = game.add.text(10, 105, "Press arrow keys to control player RED ", { fontSize: '32px', fill: '#FFF' });
		text5 = game.add.text(10, 150, "How to play: ", { fontSize: '32px', fill: '#FFF' });
		text6 = game.add.text(10, 175, "Hit the ball with your player and try to knock it into your opponent's goal", { fontSize: '32px', fill: '#FFF' });
		text7 = game.add.text(10, 200, "You move twice as fast backwards ", { fontSize: '32px', fill: '#FFF' });
		text8 = game.add.text(10, 245, "Winning the game: ", { fontSize: '32px', fill: '#FFF' });	
		text9 = game.add.text(10, 270, "Get 5 goals to win ", { fontSize: '32px', fill: '#FFF' });
		text10 = game.add.text(10, 295, "Then win as many games as you can", { fontSize: '32px', fill: '#FFF' });
		text11 = game.add.text(10, 565, "Press [ i ] to go to main menu", { fontSize: '32px', fill: '#FFF' });
		text12= game.add.text(10, 105, "Press arrow keys to control player RED ", { fontSize: '32px', fill: '#FFF' });




	},
	update: function update(){
		if (iKey.isDown) {
			game.state.start("menu");
		}
	}
}