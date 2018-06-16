class Waver extends Enemies{
	constructor(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player){
		super(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player);
		this._tiempoMovimiento = 2000; //tiempo que sube o baja
		this._tim = 0;
		this.fAux1 = this.mainMovement = this.upMovement;
		this.fAux2 = this.downMovement;
		this._dirAct = 1;
		this.sprite.animations.add('subir',[2, 1, 0], 3, false);
		this.sprite.animations.add('bajar',[0, 1, 2], 3, false);
		this._area = new Phaser.Rectangle(this.sprite.x - this.sprite.width*3, this.sprite.y, this.sprite.width*18, this.sprite.height); //area por el cual se va a mover
	}

	update(){
		//game.debug.geom(this._area,'#0fffff');
		this.colision();
		this.cambioDir();
		this.SMovement();
		this.respawn();
	}

	SMovement(){
		this.mainMovement();
		this.changeMovement();
		this.hMovement();
	}

	upMovement(){
		this.moveUp(this.sprite, 0);
	}

	downMovement(){
		this.moveDown(this.sprite, 0);
	}

	hMovement(){
		this.moveRight(this.sprite, 0);
	}

	cambio(){ //cambio en el mov de arriba a abajo
		if(game.time.now > this._tim){ //si ha pasado un segundo, aumenta el timer y devuelve true
			this._tim = game.time.now + this._tiempoMovimiento;
			if(this.sprite.animations.currentAnim.name === 'subir') this.sprite.animations.play('bajar');
			else this.sprite.animations.play('subir')
			return true;
		}
		else{
			return false;
		}
	}

	changeMovement(){
		if(this.cambio()){ //si ha pasado el segundo
			this.aux();	//intercambia las funciones auxiliares
			this.mainMovement = this.fAux1; //e iguala la funcion ppal del movimiento a la f(x) correspondiente
		}
	}

	aux(){
		var aux = this.fAux1;
		this.fAux1 = this.fAux2;
		this.fAux2 = aux;
	}

	selectDir(){
		if(this._dirAct === 1){
			this.hMovement = function(){
			this.moveRight(this.sprite, 0); //cambia la funcion de movimiento horizontal
			};
		this._dirAct = -1;
		}
		else{
			this.hMovement = function(){
			this.moveLeft(this.sprite, 0);
		}
		this._dirAct = 1;
		}
	}

	cambioDir(){ //cambio de direccion
		if(this.sprite.body.x > this._area.x + this._area.width){
			this.sprite.body.x = this.sprite.body.x - 1; //para los bugs visuales :P
			this.selectDir();
		}
		else if(this.sprite.body.x < this._area.x){
			this.sprite.body.x = this.sprite.body.x + 1;
			this.selectDir();
		}
		else if(this.sprite.body.onWall()){
			this.selectDir();
		}
		
	}
}


