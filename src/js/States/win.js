var winState ={

	preload: function(){	
		var bckAux = new Phaser.Sprite(game, 0, 0, 'creditos'); //auxiliares para rellenar la pantalla totalmente(que queda to feo si no)
		game.world.add(bckAux);
		var bee = new Phaser.Sprite(game, game.width/5, game.height/10, 'bee');
		game.world.add(bee);
		bee.scale.setTo(1.2, 1.2);
		bee.animations.add('def', [0, 1], 13, true);
		bee.animations.play('def');
		var bee2 = new Phaser.Sprite(game, game.width/1.35, game.height/10, 'bee');
		game.world.add(bee2);
		bee2.scale.setTo(1.2, 1.2);
		bee2.animations.add('def', [0, 1], 13, true);
		bee2.animations.play('def');
		var samus = new Phaser.Sprite(game, game.width/2, game.height/1.2, 'dude');
		game.world.add(samus);
		samus.scale.setTo(1.2, 1.2);
		samus.animations.add('def', [3, 4, 5], 8, true);
		samus.animations.play('def');
		
	},
	/*create: function(){
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.continue, this);
	},

	continue: function(){

		game.state.start('menu');
	}*/

};
