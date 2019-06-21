
var redWinCount = 0;
var blueWinCount = 0;
var player;
var player2;
var platforms;
var cursor;
var frameSpeed = 20;

var blocker;
var scorer;
var scorer1;
var score = 0;
var score2 = 0;
var scoreboard;
var winScore = 3;

var stars;
var ball;

var wKey;
var aKey;
var dKey;
var sKey;
var spaceKey;

var gameState = {

	create: function create() {

	    //game physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //the background
	    this.background = game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and option of 2 legdes
	    platforms = game.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground.
	    var ground = platforms.create(0, game.world.height - 64, 'ground');


	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.scale.setTo(4, 2);

	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;

	    //the scoreboard
	    scoreboard = game.add.sprite(550, 0, 'scoreboard');

	    //goalposts
	    this.goalpostLeft = game.add.sprite(-250, game.world.height - 230, 'goalpostLeft');
	    this.goalpostRight = game.add.sprite(1250, game.world.height - 230, 'goalpostRight');   

	   //blockers
	    blocker = game.add.group();
	    blocker.enableBody = true
	    var blocker1 = blocker.create(0,370, 'blocker');
	    blocker1.body.immovable = true;

	    blocker1 = blocker.create(1280, 370, 'blocker');
	    blocker1.body.immovable = true;

	    //use this invisible things to score when the ball hits them

	    scorer = game.add.sprite(50,475, 'scorer');
	    game.physics.arcade.enable(scorer);
	    scorer.body.immovable = true;

	    scorer1 = game.add.sprite(1325, 475, 'scorer');
	    game.physics.arcade.enable(scorer1);
	    scorer1.body.immovable = true;   

	    


	    //the ball
	    ball = game.add.sprite(660, game.world.height - 300, 'ball');

	    game.physics.arcade.enable(ball);

	    // The player and its settings
	    player = game.add.sprite(1400, game.world.height - 150, 'dude');
	    player2 = game.add.sprite(0, game.world.height - 150, 'dude2');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);
	    game.physics.arcade.enable(player2);


	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0;
	    player.body.gravity.y = 500;
	    player.body.collideWorldBounds = true;

	    player2.body.bounce.y = 0;
	    player2.body.gravity.y = 500;
	    player2.body.collideWorldBounds = true;
	    
	    ball.body.bounce.y = 0.99;
	    ball.body.bounce.x = 1.1;
	    ball.body.gravity.y = 200;
	    ball.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 20, true);

	    player2.animations.add('left', [0, 1, 2, 3], 20, true);
	    player2.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  Our controls.
	    cursors = game.input.keyboard.createCursorKeys();
	    
	    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
	    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
	    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
	    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
	    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);

	    //the score
	    scoreText = game.add.text(600, 50, '0', { fontSize: '32px', fill: '#FFF' });
	    scoreText2 = game.add.text(800, 50, '0', { fontSize: '32px', fill: '#FFF' });
	    winText = game.add.text(650, 300, '', {fontSize: '32px',fill: '#FFF'});
	},
	update: function update() {

	    //  Collide the player and the stars with the platforms
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(player2, platforms);
	    
	    game.physics.arcade.collide(player, player2);
	    
	    game.physics.arcade.collide(ball, platforms);
	    game.physics.arcade.collide(ball, player2);
	    game.physics.arcade.collide(ball, player);
	    
	    game.physics.arcade.collide(blocker, player);
	    game.physics.arcade.collide(blocker, player2);
	    game.physics.arcade.collide(blocker, ball);   
	    game.physics.arcade.collide(blocker, stars); 

	    game.physics.arcade.collide(stars, platforms);

	    //  Checks to see if the ball overlaps with the scorer, if he does call the collectStar function
	    game.physics.arcade.overlap(ball, scorer, scoreGoal, null, this);
	    game.physics.arcade.overlap(ball, scorer1, scoreGoalBlue, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;
	    player2.body.velocity.x = 0;


	    var playerSpeed = 250
	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -playerSpeed;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = playerSpeed*2;

	        player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();

	        player.frame = 4;
	    }
	        if (cursors.up.isDown && (player.body.touching.down || player.body.touching.player2))
	    {
	        player.body.velocity.y = -350;
	    }
	    
	     
	    if (cursors.up.isDown && player.body.touching.down)
	    {
	        player.body.velocity.y = -350;
	    }
	    

	    //player2
	    if (aKey.isDown)
	    {
	        player2.body.velocity.x = -playerSpeed*2;

	        player2.animations.play('left');
	        frameSpeed = 2
	    }
	    else if (dKey.isDown)
	    {
	        player2.body.velocity.x = playerSpeed;

	        player2.animations.play('right');
	        frameSpeed = 1
	    }
	    else
	    {
	        player2.animations.stop();

	        player2.frame = 4;
	    }
	    
	    if (wKey.isDown && (player2.body.touching.down || player2.body.touching.player))
	    {
	        player2.body.velocity.y = -350;
	    }

	    //keeps the ball off the ground
	    if (ball.body.touching.down){
	        ball.body.velocity.y = -150;
	    }
	    
	    //slows down the ball on the x axis
	    if (ball.body.velocity.x > 0){
	        ball.body.gravity.x = -15
	    } else if (ball.body.velocity.x < 0){
	        ball.body.gravity.x = 15
	    }

	},
}

function addBall (){
    ball = game.add.sprite(660, game.world.height - 300, 'ball');

    game.physics.arcade.enable(ball);
    ball.body.bounce.y = 0.99;
    ball.body.bounce.x = 1.1;
    ball.body.gravity.y = 200;
    ball.body.collideWorldBounds = true;

        //keeps the ball off the ground
    if (ball.body.touching.down){
        ball.body.velocity.y = -150;
    }
    
    //slows down the ball on the x axis
    if (ball.body.velocity.x > 0){
        ball.body.gravity.x = -15
    } else if (ball.body.velocity.x < 0){
        ball.body.gravity.x = 15
    }
}

function addplayers(){

    player.body.velocity.x = 0;
    player2.body.velocity.x = 0;

    var playerSpeed = 250
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -playerSpeed;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = playerSpeed*2;

        player.animations.play('right');

    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
        if (cursors.up.isDown && (player.body.touching.down || player.body.touching.player2))
    {
        player.body.velocity.y = -350;
    }
    
     
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    

    //player2
    if (aKey.isDown)
    {
        player2.body.velocity.x = -playerSpeed*2;

        player2.animations.play('left');
    }
    else if (dKey.isDown)
    {
        player2.body.velocity.x = playerSpeed;
        player2.animations.play('right');
    }
    else
    {
        player2.animations.stop();

        player2.frame = 4;
    }
    
    if (wKey.isDown && (player2.body.touching.down || player2.body.touching.player))
    {
        player2.body.velocity.y = -350;
    }

    player = game.add.sprite(1368, game.world.height - 150, 'dude');
    player2 = game.add.sprite(32, game.world.height - 150, 'dude2');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(player2);


    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    player2.body.bounce.y = 0;
    player2.body.gravity.y = 500;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 20, true);

    player2.animations.add('left', [0, 1, 2, 3], 20, true);
    player2.animations.add('right', [5, 6, 7, 8], 10, true);


}


function scoreGoal (ball, scorer) {

    score += 1;
    scoreText2.text =  score;

    ball.kill();
    
    player.kill();
    player2.kill();
    addplayers();


    if (score === winScore){
        
    	redWinCount += 1;
    	score = 0;
    	score2 = 0;
    	game.state.start("winred");



    } else {
    addBall();
    }
}

function scoreGoalBlue (ball, scorer1){

    score2 += 1;
    scoreText.text = score2;

    ball.kill();
    player.kill();
    player2.kill();
    addplayers();

    if (score2 === winScore){
        
    	blueWinCount += 1;
    	score = 0;
    	score2 = 0;
    	game.state.start("winblue");

    }else {
        addBall();
    }


}