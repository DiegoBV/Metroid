var menuState = {

	create: function(){

		var bckAux = new Phaser.Image(game, 0, 0, 'menuAux'); //auxiliares para rellenar la pantalla totalmente(que queda to feo si no)
		game.world.add(bckAux);
		bckAux.fixedToCamera = true;

		//Imagen de Fondo con sus animaciones
		this.backgroundImage = new Phaser.Sprite(game, 25, 0, 'menu'); //menu animado
		game.world.add(this.backgroundImage);
		this.backgroundImage.animations.add('full', game.math.numberArray(1, 5), 1, true);
		this.backgroundImage.play('full');
		this.backgroundImage.fixedToCamera = true;

		//Titulo con "FadeIn"
		this.title = game.add.image(this.backgroundImage.x + this.backgroundImage.width/2.1, this.backgroundImage.y + this.backgroundImage.height/4, 'title');
		this.title.anchor.setTo(0.5, 0.5);
    	this.title.alpha = 0;
    	this.title.fixedToCamera = true;
		var t = game.add.tween(this.title).to( { alpha: 1 }, 8000,  Phaser.Easing.Linear.None, true, 0, -1);
		t.onComplete.add(this.addText, this);

		//Musica
		this.tema = game.add.audio('maintheme', 0.3);
		this.tema.play();
		this._tema = true;

		//Aqui definiremos la tecla enter/espacio para poder hacer cositas con ella
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function(){
		if(this.enterKey.isDown){
			this.start();
		}
		else if(this.space.isDown){

			this.controles();
		}

		if(!this.tema.isPlaying && this._tema)
		{
			 this.tema.play();
		}
	},

	start: function(){
		//llamamos al siguiente estado --> Play
		this.tema.stop();
		this._tema = false;
		game.state.start('play');
	},

	controles: function(){
		this.tema.stop();
		this._tema = false;
		game.state.start('controles');
	},

	startAnimation:function(){
		this.backgroundImage.play('full');
	},

	addText: function(){
		//Textillo con FadeIn
		this.things = game.add.sprite(this.backgroundImage.x + this.backgroundImage.width/2.1, this.backgroundImage.y + this.backgroundImage.height/2, 'things');
		this.things.anchor.setTo(0.5, 0.5);
    	this.things.alpha = 0;
		game.add.tween(this.things).to( { alpha: 1 }, 8000,  Phaser.Easing.Linear.None, true, 0, -1);
	},
};
