class DamageZone extends GameSprite {
	constructor(posX, posY, sprite, gravity, player){
		super(posX, posY, sprite, gravity);
		this._player = player;
		this.setImmovable(true);
		this.VELOCIDAD_A_REDUCIR = 50; //velocidad a la cual el player se va a reducir
		this.DAÑO = 1;
	}

	update(){
		game.physics.arcade.overlap(this._player.player, this.sprite, this.damage, null, this);
	}

	damage(player){
		player.class.hSpeed = this.VELOCIDAD_A_REDUCIR;
		if(!player.class._immune){ //si no está inmune, le hace daño, le ralentiza y llama al método immune del player
			player.class.damage(this.DAÑO);
			player.class.immune(true);
		}
		if(player.class.normal != null){ //si va en bola, le transforma en normal
			player.class.normal();
		}
		player.class._puedeTrans = false; //impide que pueda transformarse en la arena (no pasaria nada, pero en el juego original no le deja)
	}
}