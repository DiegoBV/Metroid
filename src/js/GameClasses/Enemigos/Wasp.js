class Wasp extends Enemies{
	 constructor(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player){
	 	super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player);
	 	this._direccionTomada = false;
	 	this.sprite.body.setSize(this.sprite.width, this.sprite.height/2);
	 	this.sprite.animations.add('fly',[0, 1], 10, true);
	 }

	 update(){
	 	this.colision();
	 	this.logic();
	 	this.sprite.animations.play('fly');
	 }


	vertical_movement(){
		this.moveUp(this.sprite, 0);
	}

	logic(){
		if(this.sprite.y <= this._player.player.body.y + this._player.height/2 || this._direccionTomada){ //esta solucion no me mola, pero es q no me deja hacer news en tiempo de ejecucion, no entiendo
			if(!this._direccionTomada){
				this._direccionTomada = this.select_Dir(); //si no ha elegido direccion, elige su direccion dependiendo de la x del player
				this.sprite.body.velocity.y = 0;
			}
			else{
				if(this._direccionTomada === 1){
					this.moveRight(this.sprite, 0); //si la ha elegido, sigue moviendose normal
				}
				else{
					this.moveLeft(this.sprite, 0);
				}
			}
		}
		else{
			this.vertical_movement(); //si no tiene la altura del player, sigue hacia arriba
		}
	}

	select_Dir(){
		if(this._player.player.body.x >= this.sprite.body.x){
			this.moveRight(this.sprite, 0);
			return 1;
		}
		else{
			this.moveLeft(this.sprite, 0);
			return - 1;
		}
	}
}