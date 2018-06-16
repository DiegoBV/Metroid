//CLASS PLAYER, gestiona tooodo lo relacionado con el Jugador. No hay problemas en hacer varios jugadores, se podría meter un modo 2 jugadores sin problema (solo hay que poner modificables las teclas
// del movimiento obviamente, pero como no está en nuestros objetivos por ahora se puede mantener así). Movimiento, animaciones...

class Player extends Movable{
	constructor(posX, posY, sprite, gravity, speed, jumpSpeed, colliders, posIniX, posIniY){
		super(posX, posY, sprite, gravity, speed, jumpSpeed); //constructor de Movable
		this._colliders = colliders; //capa con la que ha de colisionarse
		this._posIniX = posIniX;
		this._posIniY = posIniY; //posiciones de inicio
		this.construccion_Jugador();
		this.define_Keys();

		//-----------Sonidos--------------
		this._getDamage = game.add.audio('damageSamantha', 1, false); //SOnido del daño de Samantha
		this._jump = game.add.audio('jump', 1, false); //Salto de Samantha
		this._dead = game.add.audio('deadSamantha', 1, false); //Muerte de la prota :(
		this._mejora = game.add.audio('powerup', 1, false); //Mejora del jugador
		this._object = game.add.audio('object', 1, false); //Recoge objeto
		this._played = false;

	}

//----------------------------------------------------------CONSTANTES JUGADOR ----------------------------------------------------------------

	declaracionConstantes(){
		this._TIMESALTO = 600; //tiempo que`puede saltar (+ tiempo, + salta)
		this._TIEMPOREBOTE = 200; //tiempo que rebota al hacerse daño con un enemigo (+ tiempo, + rebote)
		this._TIEMPOINMUNIDAD = 2000; //tiempo en el q es inmune el jugador
		this._STARTINGHEALTH = 30; //vida con la que comienza el jugador
		this._VELMICROSALTO = -150; //velocidad del saltito de la bomba
		this._ALPHAMAX = 0.75;
		this._ALPHAMIN = 0.25; //desde que alpha a que alpha intercala al parpadear
		this._TIEMPOTRANSICIONPARPADEO = 50; //tiempo en el que cambia un alpha y otra
		this._MAXHEALTH = 100;
		this._SPEEDBALAS = 300;
		this._RANGEBALAS = 300;
	}
//--------------------------------------------------------------------MOVIMIENTO---------------------------------------------------------------

	mueveIzquierda(){ //mueve el pj a la izquierda, guarda su direccion y gestiona sus animaciones
		this._aim = 'left';
		this.moveLeft(this._player, 0);
		this._ultimaDir = -1;
		if(!this._bola){
			if(this._player.body.onFloor()){
				if(this.IKey.isDown)
					this.cambiaAnim('runShoot'); //las condiciones de las animaciones, que son horribles
				else
					this.cambiaAnim('andar');
			}
			this._player.scale.x = -1;
		}
		else{
			this.cambiaAnim('bolitaDer');
			this._player.scale.x = -1;
		}
	}

	mueveDerecha(){ //mueve el pj a la derecha, guarda su direccion y gestiona sus animaciones
		this._aim = 'right';
		this.moveRight(this._player, 0);
		this._ultimaDir = 1;
		if(!this._bola){
			if(this._player.body.onFloor()){
				if(this.IKey.isDown)
					this.cambiaAnim('runShoot');
				else
					this.cambiaAnim('andar');
			}
			this._player.scale.x = 1;
		}
		else
			this.cambiaAnim('bolitaDer');
		this._player.scale.x = 1;
	}

	//Aquí hacemos el saltito (por tiempo presionando la tecla)
	saltar(){
		if(this.JKey.isDown && this._player.body.onFloor() && !this._bola){
			if (!this._jump.isPlaying && !this._played){
				this._jump.play();
				this._played = true;
			}

			var i = Math.floor(Math.random() * 7);
			if(i === 5 || i === 6) this.cambiaAnim('voltereta'); //la voltereta op
			else this.cambiaAnim('salto');
			this._jumpTimer = game.time.now + this._TIMESALTO;
			this.moveUp(this._player, 0);
		}
		else if(this.JKey.isDown && this._jumpTimer != 0){
			if (!this._jump.isPlaying && !this._played){
				this._jump.play();
				this._played = true;
			}

			if(!(this._animacion === 'voltereta'))
				this.cambiaAnim('salto');
			if(game.time.now > this._jumpTimer){
					this._jumpTimer = 0;
				}
				else{
					this.moveUp(this._player, 0);
				}
		}
		else{
			this._jumpTimer = 0;
		}
	}

	apuntaArriba(){
		this._aim = 'up';
		if(this._player.body.onFloor()){
			if(this._player.body.velocity.x === 0){
				this.cambiaAnim('apArriba');
			}
			else
				this.cambiaAnim('runUpShoot');
		}
		else
			this.cambiaAnim('caida');
	}

	saltoBomba(player, bomba){
		if(bomba.animations.currentAnim.name == 'expl' && this._bola){
			this.aux = true;
		}
	}
//--------------------------------------------------------------------UPDATES---------------------------------------------------------------

	update(){ //update del jugador, se reinicia la velocidad, la gravedad y comprueba si choca o no con el suelo, los eventos de teclado
		this.reset();
		this.handle_Events();
		this.Anima();
		this._puedeTrans = true; //si no esta en los overlaps que no le dejan transformarse, se pone a true y le dejan transformarse
		this.updateBullets();
		this.caida();
		this.microSalto();
		this.hSpeed = this._speed; //por si es ralentizado, para recuperar su velocidad
		if (this._player.body.onFloor()){
			this._played = false;
		}
	}

	updateBullets(){ //podrian estar en el array de colisiones, pero como cuando colisionan tienen que hacer algo específico, mejor aquí
		if(this._bombas !== undefined){ //las bombas son especialitas
			game.physics.arcade.collide(this._bombas.grupoBalas, this._colliders, this.bombasAux, null, this);
			game.physics.arcade.overlap(this._bombas.grupoBalas, this._player, this.saltoBomba, null, this);
		}
		for(var i = 0; i < this._arrayBalas.length; i++){
			game.physics.arcade.collide(this._arrayBalas[i], this._colliders, function(bullet){bullet.animations.play('expl');bullet.lifespan = 200;});
		}
	}
//--------------------------------------------------------------------HANDLE_EVENTS------------------------------------------------------------------------

handle_Events(){
		//If del movimiento...
		if(this._puedeControlar){
			if(this.AKey.isDown && !this._rebote){ //si presiona izquierda
			this.mueveIzquierda();
		}
		else if(this.DKey.isDown && !this._rebote){ //si presiona derecha
			this.mueveDerecha();
		}
		else{
			this.resetAnimaciones();
		}

		if(this.WKey.isDown && this._puedeTrans){
			this.apuntaArriba();
			if(this._bola){
				this.normal();
			}
		}

		this.saltar();

		if(this.IKey.isDown && !this._bola){ //si presiona la tecla de disparo...
			if(!this.player.body.onFloor() && this._player.body.velocity.y < 0 && !this.WKey.isDown)
				this.cambiaAnim('shootJump'); //si dispara mientras salta cambia de animacion
			this._currentBullets.shoot(this._aim);
		}
	}
}

//--------------------------------------------------------------------RESETS------------------------------------------------------------------------

	reset(){  //reset de la velocidad, si no deberia haber rebote se hace normal, si hay rebote comienza un timer y cuando el timer llegue al tiempo especificado se reinicia la velocidad
		if(!this._rebote){
			this._player.body.velocity.x = 0;  //reiniciamos variables...
		}
		else if (this._rebote && this._reboteTimer == 0){
			this._reboteTimer = game.time.now + this._TIEMPOREBOTE;
		}
		else if(game.time.now > this._reboteTimer){
				this._player.body.velocity.x = 0;
				this._rebote = false;
				this._reboteTimer = 0;
		}
		if(this._player.body.onFloor() && this._bola){
			this._player.body.velocity.y = 0; //soluciona un bug super raro loko, si cmabiabas de pestaña en bola te ibas pa abajo lel
		}
		if(!this._player.alive){
			this.res();
		}
		this.immune();
	}

	resetAnimaciones(){
			if(!this._bola){ //si no es bola y toca el suelo, pone la animacion normal, si es bola, pone la animacion de bola. Ajusta el aim también
				if(this._player.body.onFloor())
				this.cambiaAnim('normal');
				if(this._player.scale.x === -1){
					this._aim = 'left';
				}
				else{
					this._aim = 'right';
				}
			}
			else{
				this.cambiaAnim('bolitaDer');
			}
	}

//--------------------------------------------------------------------DAÑO/INMUNIDAD/REBOTE------------------------------------------------------------------------

	recoil_Damage(posEnemigo, damage){
		if(!this._immune){
			if(this._player.body.x - posEnemigo <= 0){ //para saber la direccion del rebote
				this.moveLeft(this._player, 0);
			}
			else{
				this.moveRight(this._player, 0);
			}
			this.damage(damage); //si la salud llega a 0, el player muere
			this._rebote = true;
			this.immune(true);
		}
	}

	immune(bool){
		if(this._immuneTimer === 0 && bool){
			this._immune = true;
			this._immuneTimer = game.time.now + this._TIEMPOINMUNIDAD;
		}
		else if(this._immuneTimer !== 0){
			this.blink();
			if(game.time.now > this._immuneTimer){
				this._immune = false;
				this._immuneTimer = 0;
				this._player.alpha = 1;
			}
		}
	}

//--------------------------------------------------------------------POTENCIADORES & ATRIBUTOS------------------------------------------------------------------------

	activarMejoras(i){
		this._mejora.play();
		this._potenciadores.activate(i);
	}

	heal(int){
		this._object.play();
		this._player._Health += int;
		if(this._player._Health > this._MAXHEALTH){
			this._player._Health = this._MAXHEALTH;
		}
		else if(this._player._Health < 0){
			this._player._Health = 0;
		}
	}

	damage(int){
		this._getDamage.play();
		this._player._Health -= int;
		if(this._player._Health <= 0){ //muere y hace la animacion!!
			this._player._Health = 0;
			this.morir();
		}
	}

	morir(){
		this._dead.play();
		this.cambiaAnim('morir'); //cambia la animacion
		this.Anima();
		this._puedeControlar = false; //le quita los controles y el movimiento al player
		this.sprite.body.moves = false;
		this._player.animations.currentAnim.killOnComplete = true; //cuando acaba a animacion, muere
	}

	res(){
		this._player._Health = this._STARTINGHEALTH; //si el player ha muerto, reestablece su vida inicial, le revive, cambia su animacion a la normal, le devuelve controles y movimiento
		this._player.revive();
		this._animacion = 'normal';
		this._puedeControlar = true;
		this.sprite.body.moves = true;
		this._player.body.x = this._posIniX;
		this._player.body.y = this._posIniY;
	}

	moreAmmo(int){
		this._object.play();
		this._rockets.ammo += int;
	}

	bombasAux(bullet){
		this._object.play();
		this._bombas.checkCollisionAndTime(bullet);
	}

	microSalto(){
		if(this.aux){
			this._player.body.velocity.y = this._VELMICROSALTO;
			this._microSalto = true;
			this.aux = false;
		}
		else if(this._microSalto && !this._bola){
			this._player.body.velocity.y = 0;
			this._microSalto = false;
		}
	}

//--------------------------------------------------------------------ANIMACIONES------------------------------------------------------------------------

	Anima(){
		this._player.animations.play(this._animacion);
	}

	cambiaAnim(anim){
		if(this._animacion !== 'morir') //para evitar cosas raras al morir
			this._animacion = anim;
	}

	caida(){ //gestiona la animacion de la caida
		if(this._player.body.velocity.y > 0){
			if(this.IKey.isDown && !this.WKey.isDown){
				this.cambiaAnim('fallShoot');
			}
			else if(!(this._animacion === 'voltereta'))
				this.cambiaAnim('caida');
		}
	}

	blink(){ //parpadeo al ser dañado
		if(game.time.now > this._blinkTimer){
			if(this._player.alpha === this._ALPHAMAX || this._player.alpha === 1){
				this._player.alpha = this._ALPHAMIN;
			}
			else{
				this._player.alpha = this._ALPHAMAX;
			}
				this._blinkTimer = game.time.now + this._TIEMPOTRANSICIONPARPADEO;
		}
	}

//------------------------------------------------------------CONSTRUCCIÓN & DECLARACIÓN DE VARIABLES------------------------------------

	construccion_Jugador(){ //construccion de las variables necesarias para el jugador
		this.declaracionConstantes();
		this._player = this._sprite; //asignacion con el sprite del padre para que el nombre sea mas legible
		this._player.anchor.setTo(0.5, 0.5); //ancla
		this._player._Health = this._STARTINGHEALTH; //vida inicial original del juego
		this._immune = false;
		this._immuneTimer = 0;  //timers de inmune y de parpadeo
		this._blinkTimer = 0;
		this._aim = 'right';
		this._currentBullets = new Bullets('bala', this._SPEEDBALAS, this._RANGEBALAS, this, null, true); //balas añadidas en una clase
		this.declaracionAnimaciones();
		this._width = this._player.body.width;
		this._height = this._player.body.height;
		this._potenciadores = new Potenciadores(this); //potenciadores activados por el player
		this._animacion = 'normal';
		this._jumpTimer = 0;
		this._rebote = false;  //Timer del jump, del rebote...
		this._reboteTimer = 0;
		this._arrayBalas = [this._currentBullets.grupoBalas]; //array de balas disponibles en el jugador
		this._ultimaDir = 1; //almacena la ultima direccion pulsada, util para cuadrar las animaciones
		this.aux = false;
		this.grupoAuxiliar = new Group(); //le añades objetos q se creen en tiempo de ejecucion para que esten en la layer correcta...
		this._player.class = this;
		this._speed = this.hSpeed;
		this._puedeControlar = true;
		game.camera.follow(this.player);
	}


	define_Keys(){
		this.JKey = game.input.keyboard.addKey(Phaser.Keyboard.J); //definimos la Z
		this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.W); //definimos la X
		this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.A); //definimos la Z
		this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.S); //definimos la X
		this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.D); //definimos la Z
		this.IKey = game.input.keyboard.addKey(Phaser.Keyboard.I); //definimos la X
	}

	declaracionAnimaciones(){
		this._player.animations.add('normal', [1], 0, true);
		this._player.animations.add('bolitaDer', [11, 12, 13, 14], 10, true);
		this._player.animations.add('bolitaIz', [14, 13, 12, 11], 10, true);
		this._player.animations.add('salto', [19], 0, true);
		this._player.animations.add('caida', [20], 0, true);
		this._player.animations.add('bolitaParada', [11], 0, true);
		this._player.animations.add('andar', [3, 4, 5], 8, true);
		this._player.animations.add('apArriba', [2], 0, true);
		this._player.animations.add('shootJump', [16], 0, true);
		this._player.animations.add('fallShoot', [17], 0, true);
		this._player.animations.add('runShoot', [15, 16, 17], 8, true);
		this._player.animations.add('runUpShoot', [18, 19, 20], 8, true);
		this._player.animations.add('voltereta', [7, 8, 9 , 10], 15, true);
		this._player.animations.add('morir', [24, 25, 26], 2, false);
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	get x(){
		return this._player.x;
	}
	get y(){
		return this._player.y;
	}
	get width(){
		return this._width;
	}
	get height(){
		return this._height;
	}
	get player(){
		return this._player;
	}
	get health(){
		return this._player._Health;
	}
	get jumpSpeed(){
		return this._jumpSpeed;
	}
	get grupoBalas(){
		return this._currentBullets.grupoBalas;
	}
	get bombas(){
		return this._bombas;
	}
	set jumpSpeed(vel){
		this._jumpSpeed = vel;
	}
	get ammo(){
		return this._currentBullets.ammo;
	}
}
