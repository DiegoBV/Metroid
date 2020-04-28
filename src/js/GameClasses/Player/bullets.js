//CLASE BALAS, sprite que tiene la capacidad de moverse. Es un grupo de sprites que pueden ser disparados desde un "shooter". Deben ser capaces de hacer daño a enemigos
//(aun por implementar)

class Bullets extends Movable{
	constructor(sprite, speed, range, shooter, ammo, bool){
		super(0, 0, null, 0, speed, speed); //conctructor de Movable
		//Balas
		this.sprite = new Group(); //el sprite pasa a ser un nuevo grupo (reutulizable para enemigos)
		this._balas = this.sprite.group;
		this._balas.createMultiple(100, sprite); //creamos 20 balas, y luego las reutilizamos tooodo el rato
		this._balas.setAll('outOfBoundsKill', true); //hacemos que desaparezcan al chocar con los limites
		this._balas.setAll('checkWorldBounds', true);//comprueba que no se ha chocado con nada

		for(var i = 0; i < this._balas.length; i++){ //escalamos, collider... a todos los hijos
			this._balas.children[i].scale.setTo(0.10, 0.10); //escalamos sprite & collider
			this._balas.children[i].body.setSize(0.2,0.2);
			if(bool){
				this._balas.children[i].animations.add('normal',[0], 0, true);
				this._balas.children[i].animations.add('expl', [1], 0, true);
			}
		}

		this._tiempoBala = 0;
		this._shooter = shooter;
		this._range = range;
		this._ammo = ammo;
		this._TIEMPOENTREBALAS = 200; // a mas tiempo, menos balas

		//-------------------Sonidos-----------------------
		this._shoot = game.add.audio('shoot', 0.7, false); //Disparo (sonido cuando es disparada)
	}

//--------------------------------------------------------------------DISPARO------------------------------------------------------------------

	shoot(aim){
		if(game.time.now > this._tiempoBala){

			var bal = this._balas.getFirstExists(false); //cogemos la primera bala
			this._shoot.play();
			bal.animations.play('normal'); //animacion
			this.gestionaBala(aim ,bal);
			this.gestionAmmo();
		}
	}

	gestionaBala(aim , bullet){  //elige direccion , ajusta el rango, el tiempo...
		if(aim === 'left'){
			bullet.reset(this._shooter.x - this._shooter.width + this._shooter.height/8, this._shooter.y); //le marcamos su posicion inicial
			this.moveLeft(bullet, -90);
		}
		else if(aim === 'right'){
			bullet.reset(this._shooter.x + this._shooter.width - this._shooter.height/8, this._shooter.y - this._shooter.height/6); //le marcamos su posicion inicial
			this.moveRight(bullet, 90);
		}
		else if(aim  === 'up'){
			var x = this.aux();
			bullet.reset(this._shooter.x + x, this._shooter.y - this._shooter.height/2); //le marcamos su posicion inicial
			this.moveUp(bullet, 0);
		}
		this._tiempoBala = game.time.now + this._TIEMPOENTREBALAS; //temporizador para que no dispare chorrocientas balas de golpe
		bullet.lifespan = this._range; //rango de la bala peeeeero lo he medido en tiempo, no queda mal y no es dificil de hacer asi que ¯\_(ツ)_/¯
		//los numeritos son para cuadrar las balas (no me mola, pero los anchors...)
	}

	gestionAmmo(){ //en caso de tener municion, este metodo reduciria la municion al disparar el tipo de bala que corresponda
		if(this._ammo !== null){
			this._ammo--; //reducir la municion de los misiles
			if(this.ammo === 0){
				this._shooter.changeBullets(); //se cambia automáticamente, al igual que en el juego
			}
		}
	}


//--------------------------------------------------------------------AUXILIARES------------------------------------------------------------------

	aux(){ //metodo auxiliar para ajustar la posicion de la bala si apunta arriba
		var x;
		if(this._shooter._ultimaDir == 1){
			x = 0;
		}
		else{
			x = -this._shooter.width/3;
		}
		return x;
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	set range(newRange){
		this._range = newRange;
	}

	get grupoBalas(){
		return this._balas;
	}

	get ammo(){
		return this._ammo;
	}

	set ammo(amount){
		this._ammo = amount;
	}
}
