class LastDoor extends RocketDoor{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity, player, numPuerta, tipoBala);
		this.aux2 = game.add.sprite(posX + this.sprite.width*1.75, posY - 32, 'block'); //32 es lo que mide un tile, no es un numero magico ehh
		game.physics.arcade.enable(this.aux2);
		this.aux2.body.immovable = true;
		this.NUMTOTALPOTENCIADORES = 5;
	}

	update(){
		game.physics.arcade.collide(this._player.player, this.aux2);
		this.logicaPuerta();
		this.abrir_Puerta();
		this.desactivar();
	}

	abrir_Puerta(){
		if(playState._potActivados >= this.NUMTOTALPOTENCIADORES && this._activa){
			this._open = true;
			this.sprite.animations.play('abierta');
			this._activa = false;
			this.aux2.kill();
		}
		else{
			this._open = false;
		}
	}
}