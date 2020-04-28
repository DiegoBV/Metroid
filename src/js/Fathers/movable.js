//CLASE MOVABLE, cualquier sprite que tenga movimiento debería heredar de esta clase, la cual hereda a su vez de GameSprite.

class Movable extends GameSprite{
	constructor(posX, posY, sprite, gravity, hSpeed, vSpeed){
		super(posX, posY, sprite, gravity); //contructor de GameSprite
		this._hSpeed = hSpeed; //velocidad horizontal
		this._vSpeed = vSpeed; //velocidad vertical
	}

//--------------------------------------------------------------------MOVIMIENTO---------------------------------------------------------------

	moveRight(object, angle){
		object.body.velocity.x = this._hSpeed;
		object.angle = angle;
	}

	moveLeft(object, angle){
		object.body.velocity.x = -this._hSpeed;
		object.angle = angle;
	}

	moveUp(object, angle){
		object.body.velocity.y = -this._vSpeed;
		object.angle = angle;
	}

	moveDown(object, angle){
		object.body.velocity.y = this._vSpeed;
		object.angle = angle;
	}

//------------------------------------------------GETS & SETS--------------------------------------------------------------------

	get vSpeed(){
		return this._vSpeed;
	}
	get hSpeed(){
		return this._hSpeed;
	}
	set hSpeed(newSpeed){
		this._hSpeed = newSpeed;
	}
	set vSpeed(newSpeed){
		this._vSpeed = newSpeed;
	}
}