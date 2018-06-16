class DoorFather extends GameSprite{
	constructor(posX, posY, sprite, gravity, player, numPuerta, tipoBala){
		super(posX, posY, sprite, gravity);
		this._player = player;
		this.setImmovable(true);
		this._open = false;
		this.sprite.animations.add('cerrada', [0], 0, false);
		this.sprite.animations.add('abierta', [1, 2], 5, false);
		this._NUMPUERTA = numPuerta;
		this._tipoBala = tipoBala;
		this._enCurso = false;
		this._activa = true;
		this._posAux = 0;
		this._dirAux = 0;
		this._timer = 0;
		this._DISTANCIA = this.sprite.width/6; //distancia a la cual empieza a atravesar la puerta
		this._VELOCIDADREDUCIDA = 80; //velocidad a la cual el player atraviesa la puerta
	}

	logicaPuerta(){
		//game.debug.body(this.sprite);
		//this.camera();
		if(!this._open){ //si no está, abierta, colisiona con player y balas
			this.sprite.animations.play('cerrada');
			game.physics.arcade.collide(this._player.player, this.sprite);
			for(var i = 0; i < this._player._arrayBalas.length; i++){
				game.physics.arcade.collide(this._player._arrayBalas[i], this.sprite, function(door, bullet){bullet.animations.play('expl'); bullet.lifespan = 200;if(bullet.key === this._tipoBala){this.abrir_Puerta();}}, null, this); //abrir la puerta
			}
		}
		else if(this._player.player.x >= this.sprite.x - this._DISTANCIA && this._player.player.x <= this.sprite.x + this.sprite.width + this._DISTANCIA){ //si esta dentro de la puerta
				this._enCurso = true;
				this._player._puedeControlar = false; //controla al jugador solo
				this.aux = this._player.hSpeed;
				this._player.hSpeed = this._VELOCIDADREDUCIDA;
				if(this._player._ultimaDir === 1){
					this._player.mueveDerecha();	
				}
				else
					this._player.mueveIzquierda();
			}
		else if(!this._player._puedeControlar && this._enCurso){  //recupera el jugador los controles y cierra la puerta
				this._enCurso = false;
				this._open = false;
				this._player._puedeControlar = true;
				this._player.hSpeed = this.aux;
		}	
	}

	/*camera(){ //emmplfpl no se si me convence esto...
		if(this.sprite.inCamera){
			if(this._player.player.x < this.sprite.x){
				if(game.camera.x + 800 - this.sprite.width/2 > this.sprite.x){
					game.camera.x = this.sprite.x - 800 + this.sprite.width/2;
					this._dirAux = 1;
				}
			}
			else{
				if(game.camera.x - this.sprite.width/2 < this.sprite.x){
					game.camera.x = this.sprite.x + this.sprite.width/2;
					this._dirAux = -1;
				}
			}
			this._posAux = this.sprite.x;
		}
	}*/
}