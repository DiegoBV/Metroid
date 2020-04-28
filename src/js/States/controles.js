var ControlesState = {
	//imagen
	create: function(){
		var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		escKey.onDown.addOnce(this.menu, this);
		this.controlesImage = new Phaser.Image(game, 0, 0, 'controles');
		game.world.add(this.controlesImage);
		this.metroido = new Phaser.Sprite(game, game.width/13, game.height/15, 'metroido');
		game.world.add(this.metroido);
		this.metroido.scale.setTo(3, 3);
		this.metroido.animations.add('def', [0, 1], 5, true);
		this.metroido.animations.play('def');
		this.metroido2 = new Phaser.Sprite(game, game.width/1.3, game.height/15, 'metroido');
		game.world.add(this.metroido2);
		this.metroido2.scale.setTo(3, 3);
		this.metroido2.animations.add('def', [0, 1], 5, true);
		this.metroido2.animations.play('def');
		this.samus = new Phaser.Sprite(game, game.width/1.1, game.height/1.2, 'dude');
		this.samus.scale.setTo(1.5, 1.5);
		game.world.add(this.samus);
		this.samus.animations.add('def', [11, 12, 13, 14], 10, true);
		this.samus.animations.play('def');
	},

	menu: function(){
		game.state.start('menu');
	},

};