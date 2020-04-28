class WaspSpawn extends GameSprite{
	constructor(posX, posY, sprite, gravity, time, player){
		super(posX, posY, sprite, gravity);
		this._time = time;
		this._timer = 0;
		this._player = player;
		this._bichito = new Wasp(this.sprite.body.x, this.sprite.body.y, 0,'wasp', 350, 250, false, 5, 7, 0, this._player);
		this._activo = false;
		this._area = new Phaser.Rectangle(this.sprite.x - 450, this.sprite.y - 30, 900, -400);
	}

	spawn(){
		this._bichito.sprite.revive(); //revive al bicho, le devuelve sus vidas y lo resetea a la pos inicial
		this.rotacionSprite();
		//this._bichito.sprite.tint = Math.random() * 0xffffff //mola?
		this._bichito._lives = this._bichito._auxLives;
		this._bichito.sprite.body.x = this.sprite.body.x;
		this._bichito.sprite.body.y = this.sprite.body.y;
		this._bichito._direccionTomada = false;
	}

	update(){
		//game.debug.geom(this._area,'#0fffff');
		if(this._activo)
			this._bichito.update();
		this.timing();
	}

	timing(){
		if(game.time.now > this._timer && this.esta_Cerca()){
			this._activo = true;
			this.spawn();
			this._timer = game.time.now + Math.floor(Math.random() * (this._time - this._time/2) + this._time/2); //no sé si he hecho bien este random , teoricamente genera un numero entre this._time/2 y this._time
		}
	}

	esta_Cerca(){
		return (this._player.player.body.x < this._area.x + this._area.width && this._player.player.body.x > this._area.x && this._player.player.body.y < this._area.y
		 		&& this._player.player.body.y > this._area.y + this._area.height);
	}

	rotacionSprite(){
		if(this._player.player.body.x >= this.sprite.body.x){
			this._bichito.sprite.scale.x = -1;
		}
		else{
			this._bichito.sprite.scale.x = 1;
		}
	}
}