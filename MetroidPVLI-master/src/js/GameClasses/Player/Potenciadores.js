//CLASS POTENCIADORES, clase en la que agregaremos todas las funciones necesarias al player para poder hacer nuevas acciones

class Potenciadores{ 
	constructor(player){
		this._player = player;
		this.arrayPot = [this.agregarBola, this.superSalto, this.rockets, this.bombas, this.extRange]; //Array de funciones, esto molap
		this.AUMENTO_SALTO = 1.5; //NUMERO POR EL QUE SE MULTIPLICA EL SALTO ACTUAL
	}

//--------------------------------------------------------------------BOLA------------------------------------------------------------------------
	extRange(self){
		self._player._basicBullets._range = null;
	}
	
	agregarBola(self){ //agrega todas las funciones necesarias para que el jugador se transforme en bola
		//Agrega la funcion al player de transformarse en pelotita, le cambia el collider, la animacion...
		self._player.bolita = function(){
			if(this._puedeTrans){
				this._bola = true;
			}
		}
		
		//Hace la comprobacion de que no esta saltando y se transforma en bola
		self._player.transformarse = function(){
			if(this._player.body.velocity.y === 0){
				this.bolita();
			}
		}

		//vuelve a la normalidad
		self._player.normal = function(){ 
			if(this._bola && this._puedeTrans){
				this._bola = false;
				if(this._ultimaDir == 1){
					this._aim = 'right';
					this._player.scale.x = 1;
				}
				else{
					this._aim = 'left';
					this._player.scale.x = -1;
				}
			}
		}

		//util para el overlap con los objetos que necesitamos para hacer que no se transforme en ciertas zonas
		self._player.no_PuedeTransformarse = function(){
			this._puedeTrans = false;
		}
 		
 		//Agregamos la funcion 'transformarse' al curso Down (mejor en la S (?))
		self._player.SKey.onDown.add(self._player.transformarse, self._player);
	}

//--------------------------------------------------------------------SALTO POTENCIADO------------------------------------------------------------------------

	superSalto(self){
		self._player.vSpeed = self._player.vSpeed * self.AUMENTO_SALTO; //valor que aún no he definido bien, ahora salta mucho creo xD
	}

//--------------------------------------------------------------------COHETES e.e------------------------------------------------------------------------

	rockets(self){
		self._player._rockets = new Bullets('rocket', 300, null, self._player, 5, true); //nuevas balas
		self._player._arrayBalas.push(self._player._rockets.grupoBalas); //push al array de balas
		self._player._basicBullets = self._player._currentBullets; //guardamos en basicBullets las balas básicas
		self._player.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

		playState.canvas.addImage(1, 'canvasMisiles'); 
		playState.canvas.addText(1, self._player._rockets.ammo, 38);
		self._player.changeBullets = function(){ //cambiar balas con la tecla SHIFT
				if(this._currentBullets === this._basicBullets && this._rockets.ammo > 0){ //si esta con las balas básicas y tiene municion de cohetes
					this._player.tint = 0xff391f;
					this._currentBullets = this._rockets;
				}
				else{
					this._player.tint = 0xffffff;
					this._currentBullets = this._basicBullets;
				}
		}
		self._player.shiftKey.onDown.add(self._player.changeBullets, self._player);
	}

//--------------------------------------------------------------------BOMBAS------------------------------------------------------------------------

	bombas(self){
		self._player._bombas = new Bullets('bomba', 0, 700, self._player, null, true); //nuevas balas
		self._player.grupoAuxiliar.group.add(self._player._bombas.grupoBalas);
		for(var i = 0; i < self._player._bombas.grupoBalas.length; i++){ //las bombas son "balas" diferentes, por lo cual hay que hacerle unos pocos ajustillos
			self._player._bombas.grupoBalas.children[i].body.bounce.y = 0.5; //un poco de rebote como en el juego
			self._player._bombas.grupoBalas.children[i].body.gravity.y = 200; //ajustes para la estética y eso
			self._player._bombas.grupoBalas.children[i].scale.setTo(1, 1);
			self._player._bombas.grupoBalas.children[i].anchor.x = 0.5;
			self._player._bombas.grupoBalas.children[i].anchor.y = 0.5;
			self._player._bombas.grupoBalas.children[i].timer = 0; //les otorgamos un timer a cada una
		}


		self._player._bombas.shoot = function(){ //redefinimos el metodo shoot original de las balas
			if(game.time.now > this._tiempoBala){
				var bal = this._balas.getFirstExists(false);
				bal.animations.play('normal');
				bal.reset(this._shooter.x + this._shooter.width/5, this._shooter.y + this._shooter.height/2);
				this._tiempoBala = game.time.now + 1000;
				bal.lifespan = 0;
			} 
		}

		self._player._bombas.checkCollisionAndTime = function(bullet){ //comprueba colision con el enemigo(aún no) y las hace explotar en un tiempo determinado
			if(bullet.timer === 0 && bullet.lifespan === 0){
				bullet.timer = game.time.now + this._range;
			}
			else if(bullet.timer > 0 && game.time.now > bullet.timer){
					bullet.animations.play('expl');
					bullet.lifespan = 300;
					bullet.timer = 0;
			}
		}

		self._player.placeBomb = function(){ //colocacion de bomba
			if(this._bola){
				this._bombas.shoot();
			}
		}

		self._player.IKey.onDown.add(self._player.placeBomb, self._player);
	}

//--------------------------------------------------------------------ACTIVACION DE POTENCIADORES------------------------------------------------------------------------

	activate(index){
		this.arrayPot[index](this);
	}
}
