class ObjectPot extends GameSprite{
	constructor(posX, posY, sprite, gravity, type, player){
		super(posX, posY, sprite, gravity);
		this._type = type;
		this._player = player;
		this._FINISH = 8; //pot que indica el final
		this.sprite.animations.add('def', [0, 1, 2, 3], 15, true);
		this.sprite.animations.play('def');
		this._AMMO = 5;
		this._tipoRecargaAMMO = 5; //numero que aparece en el tileMap
		if(type == this._FINISH){
			this.sprite.tint = 0xff5074;
		}
	}

	update(){
		game.physics.arcade.overlap(this._player.player,this.sprite, this.activarMejora, null, this);
	}

	activarMejora(){
		this.kill();
		if(this._type < this._tipoRecargaAMMO){
			this._player.activarMejoras(this._type);
			playState._potActivados++;
		}
		else if(this._type == this._tipoRecargaAMMO){
			this._player.moreAmmo(this._AMMO);
		}
		else if(this._type == this._FINISH){
			game.state.start('win');
		}
		else{
			this._player.heal(this._player._MAXHEALTH);
		} 

	}
}