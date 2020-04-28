class Bat extends Enemies{
	constructor(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player){
		super(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player);
		this._area = new Phaser.Rectangle(this.sprite.x - this.sprite.width*3, this.sprite.y, this.sprite.width*6, this.sprite.height*20); //area de "vision" del murcielago
		this._Bullets = new Bullets('balaBat', 300, 200, this.sprite, null, false);
		this._Bullets.shoot = function(dir){ //redefino el método shoot de las balas
			var bal = this._balas.getFirstExists(false);
			bal.reset(this._shooter.x, this._shooter.y); //le marcamos su posicion inicial
			switch(dir){
				case 'left':
					this.moveLeft(bal, 0);
					break;
				case 'right':
					this.moveRight(bal, 0);
					break;
				case 'dLeft':
					this.moveLeft(bal, 0);
					this.moveUp(bal, 0);
					break;
				case 'dRight':
					this.moveRight(bal, 0);
					this.moveUp(bal, 0);
					break;
			}
			bal.lifespan = this._range;
		};
		this._tiempoSuelo = 500; //tiempo que tarda en "explotar"
		this._timer = 0;
		this._fAux = this.wakeUp;
		this.sprite.animations.add('default', [0, 1, 2], 8, true);
	}

	caidaLibre(){
		this.moveDown(this.sprite, 0); //mueve hacia abajo y e intenta igualar su x con tu x
		this.selectDir();
	}

	selectDir(){
		if(this._player.player.body.x > this.sprite.body.x){
			this.moveRight(this.sprite, 0);
		}
		else if(this._player.player.body.x < this.sprite.body.x){ //distingo las dos pos por si el player se queda quieto, para que no haga cosas raras
			this.moveLeft(this.sprite, 0);
		}
	}

	wakeUp(){
		if(!this._haMuerto && this._player.player.body.x < this._area.x + this._area.width && this._player.player.body.x > this._area.x && this._player.player.body.y > this._area.y && this._player.player.body.y < this._area.y + this._area.height){
			this.wakeUp = function(){ //si esta dentro del area, cambiamos la funcion a caida Libre
				this.caidaLibre();
				if(this.sprite.body.onFloor()){
					this._timer = game.time.now + this._tiempoSuelo;
					this.wakeUp = function(){ //si toca, el suelo, cambiamos la funcion a la explosion
						this.explosion();
					}
				}
			};
		}
	}

	update(){
		//game.debug.geom(this._area,'#0fffff');
		this.colision();
		this.wakeUp();
		game.physics.arcade.collide(this._Bullets._balas, this._player.player, this.dañoPorBala, null, this); //balas del enemigo
		this.sprite.animations.play('default');
		this.respawn();
	}

	explosion(){
		if(game.time.now > this._timer && this._timer !== 0 && this.sprite.alive){
			this.wakeUp = this._fAux; //cuando explota, la funcion vuelve a ser la original
			this._Bullets.shoot('dRight');
			this._Bullets.shoot('dLeft'); //envia balas en las 4 direcciones
			this._Bullets.shoot('right');
			this._Bullets.shoot('left');
			this._lives = 0;
			this.killThis();
			this._timer = 0;
			//this.loot();
		}
		else if(!this.sprite.alive){
			this.wakeUp = this._fAux;
		}
	}

	dañoPorBala(player, bullet){ //método estetico, lo unico diferente que hace es que la bala desaparece si se choca contigo
		this.damagePlayer();
		bullet.lifespan = 10; //hace desaparecer la bala
	}
}
