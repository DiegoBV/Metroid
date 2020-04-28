//Los crawler son los enemigos que se mueven por el suelo
//hacen daño al jugador si los toca y pueden trepar paredes
//Además si detectan que el jugador está en su mismo plano
//Se mueven más rápido.
class Crawler extends Enemies {
  //COnstructor del Crawler
  constructor (posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player){
    super(posX, posY, gravity, sprite, speedX, speedY, colliders, lives, damage, type, player);
    this._crawler = this._sprite;
    this._crawler.class = this;
    this._dir = 1;
    this._VSpeedAux = this.vSpeed;
    this._HSpeedAux = this.hSpeed;
    this._trepa = true;
    this._cuelga = false;
    //this.sprite.body.setSize(this.sprite.width, this.sprite.height);
    //Estos bool son para configurar bien el movimiento entre trepar y colgar
    /*this._vertical = false;  //Para que trepe por las paredes
    this._cuelga = false;   //Para que se mueva por el techo
    this._tocaPantalla = false;  //Para que cambie la dir*/
    this._fAux = this.cambioMovement;
    this._manoX = this._crawler.x;
 	this._manoY = this._crawler.y + this.height;
 	this._auxX = 0;
 	this._auxY = this._crawler.height;
  }

  /*comprueba_Block(x, y){
  	return (playState.map._map.getTileWorldXY(x + this._crawler.width, y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x - this._crawler.width, y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x, y - this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(x, y + this._crawler.height,32,32, playState.map._blockedLayer) === null);
  }*/

  hayTile(x, y){ //a lo mejor esto ayuda pa mañana, en plan guardar en una variable la direccion que comprueba y mientras haya tile y no este bloq sigue por ahi, si no busca
  	return (playState.map._map.getTileWorldXY(x, y,32,32, playState.map._blockedLayer) !== null && playState.map._map.getTileWorldXY(x, y,32,32, playState.map._blockedLayer) !== undefined);
  }

  compruebaDir(){
  	game.physics.arcade.collide(this._crawler, playState.map.c);
  	console.log(this._crawler.body.blocked.left);
  	if(this._crawler.body.blocked.right){
  		if(!this.hayTile(this._crawler.x, this._crawler. y - this._crawler.height)){
  			this.movement = function(){
  			this.moveUp(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x, this._crawler. y + this._crawler.height)){
  			this.movement = function(){
  			this.moveDown(this._crawler, 0);
  			};
  		}
  		
  		else if(!this.hayTile(this._crawler.x - this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  			};
  		}
  
  	}
  	else if(this._crawler.body.blocked.left){
  		if(!this.hayTile(this._crawler.x, this._crawler. y - this._crawler.height)){
  			this.movement = function(){
  			this.moveUp(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x, this._crawler. y + this._crawler.height)){
  			this.movement = function(){
  			this.moveDown(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x + this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveRight(this._crawler, 0);
  			};
  		}
  	}
  	else if(this._crawler.body.blocked.up){
  		if(!this.hayTile(this._crawler.x - this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x + this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveRight(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x, this._crawler. y + this._crawler.height)){
  			this.movement = function(){
  			this.moveDown(this._crawler, 0);
  			};
  		}
  	}
  	else if(this._crawler.body.blocked.down){
  		if(!this.hayTile(this._crawler.x + this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveRight(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x - this._crawler.width, this._crawler. y)){
  			this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  			};
  		}
  		else if(!this.hayTile(this._crawler.x, this._crawler. y - this._crawler.height)){
  			this.movement = function(){
  			this.moveUp(this._crawler, 0);
  			};
  		}
  	}
  	/*var r = this.hayTile(this._crawler.x + this._crawler.width, this._crawler.y);
  	var l = this.hayTile(this._crawler.x - this._crawler.width, this._crawler.y);
  	var u = this.hayTile(this._crawler.x, this._crawler.y - this.height);
  	var d = this.hayTile(this._crawler.x, this._crawler.y + this.height);
  	if(!u && this._dir !== -2){
  		this._dir = 2;
  		this._auxX = this._crawler.width;
  		this._auxY = 0;
  		this.movement = function(){
  			this.moveUp(this._crawler, 0);
  		}
  	}
  	else if(!r && this._dir !== -1){
  		this._dir = 1;

  		this.movement = function(){
  			this.moveRight(this._crawler, 0);
  		}
  	}
  	else if(!l && this._dir !== 1){
  		this._dir = -1;
  		this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  		}
  	}
  	else if(!d && this._dir !== 2){
  		this._dir = -2;
  		this.movement = function(){
  			this.moveDown(this._crawler, 0);
  		}
  	}

  }
  cambioMovement(){ //paso, lo voy a hacer dandole colisiones propias a los bichejos estos, da´más trabajo en el mapa pero bueno
  	var col =  this.hayTile(this._crawler.x + this._auxX, this._crawler.y + this._auxY);
  	if(this._crawler.body.blocked.right || this._crawler.body.blocked.left || this._crawler.body.blocked.up || this._crawler.body.blocked.down){ //si está bloqueado por cualquiera de las cuatro direcciones...
  		this.compruebaDir();
  	}

  	if(!col){
  		console.log('mmmm me voyyy');
  	}
  	/*if(!this._crawler.body.blocked.right && !this._cuelga && this._dir !== -1){
  		this._dir = 1;
  		this.moveRight(this._crawler, 0);
  	}
  	else if(!this._crawler.body.blocked.left && !this._cuelga && this._dir !== 1){
  		this._dir = -1;
  		this.moveLeft(this._crawler, 0);
  	}
  	else{
  		this._trepa = false;
  		this._cuelga = true;
  	}
  	
  	if(!this._crawler.body.blocked.up && !this._trepa && this._dir !== -2) {
  		this._dir = 2;
  		this.moveUp(this._crawler, 0);
  	}
  	else if(!this._crawler.body.blocked.down && !this._trepa && this._dir !== 2){
  		this._dir = -2;
  		this.moveDown(this._crawler, 0);
  	}
  	else{
  		this._cuelga = false;
  		this._trepa = true;
  	}


  
  	//game.debug.body(this._crawler);
  	//console.log(playState.map._map.getTileWorldXY(this._crawler.x - this._crawler.width, this._crawler.y + this._crawler.height -this._crawler.height -this._crawler.height,32,32, playState.map._blockedLayer) )
  	if(!this._crawler.body.blocked.right && !this._crawler.body.blocked.lef && !this._crawler.body.blocked.down && !this._crawler.body.blocked.up){
  		var lef = this.comprueba_Block(this._crawler.x - this._crawler.width, this._crawler.y);
  		var rig = this.comprueba_Block(this._crawler.x + this._crawler.width, this._crawler.y);
  		var up = this.comprueba_Block(this._crawler.x , this._crawler.y - this._crawler.height - this._crawler.height);
  		var dow = this.comprueba_Block(this._crawler.x , this._crawler.y + this._crawler.height);
  		console.log(up)
  		if(!lef && this._dir !== -1 && this._dir !== 1){
  			this._dir = -1;
  				this.moveLeft(this._crawler, 0);
  		}

  		 else if(!rig && this._dir !== 1 && this._dir !== -1){
  		 	this._dir = 1;
  				this.moveRight(this._crawler, 0);
  		}

  		else if(!dow && this._dir !== -2 && this._dir !== 2){
  			this._dir = -2;

  				this.moveDown(this._crawler, 0);

  		}

  		else if(!up && this._dir !== 2 && this._dir !== -2){
  			this._dir = 2;

  				this.moveUp(this._crawler, 0);

  		}

  	}
  	/*if(this._crawler.body.onWall() && !this._trepa){
  		this._VSpeedAux *= -1;
  		this._trepa = true;
  		this._dir = -1;
  		this._cuelga = false;
  	}
  	else if(this._crawler.body.blocked.up && !this._cuelga){
  		this._HSpeedAux *= -1;
  		this._dir = 1;
  		this._trepa = false;
  		this._cuelga = true;
  	}
  	else if(this._crawler.body.onFloor()){
  		this._dir = 1;
  		this._trepa = false;
  		this._cuelga = false;
  	}*/
  	/*if(this._crawler.body.blocked.right){
  		this._noBlock = false;
  		this._dir = -2;
  		this.movement = function(){
  			this.moveDown(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.left){
  		this._noBlock = false;
  		this._dir = 2;
  		this.movement = function(){
  			this.moveUp(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.up){
  		this._noBlock = false;
  		this._dir = 1;
  		this.movement = function(){
  			this.moveRight(this._crawler, 0);
  		};
  	}
  	else if(this._crawler.body.blocked.down){
  		this._noBlock = false;
  		this._dir = -1;
  		this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  		};
  	}
  	/*if(!this._noBlock && playState.map._map.getTileWorldXY(this._crawler.body.x + this._crawler.width, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x - this._crawler.width, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x, this._crawler.body.y - this._crawler.height,32,32, playState.map._blockedLayer) === null && playState.map._map.getTileWorldXY(this._crawler.body.x, this._crawler.body.y + this._crawler.height,32,32, playState.map._blockedLayer) === null){
 		console.log('wut');
 		if(this._dir === 2){
 			this._dir = -1;
 			this.movement = function(){
  			this.moveLeft(this._crawler, 0);
  			};
 		}
 		else if(this._dir === -2){
 			this._dir = 1;
 			this.movement = function(){
  			this.moveRight(this._crawler, 0);
  		};
 		}
 		else if(this._dir === 1){
 			this._dir = -2;
  		this.movement = function(){
  			this.moveDown(this._crawler, 0);
  		};
 		}
 		else if(this._dir === -1){
 			this._dir = 2;
  		this.movement = function(){
  			this.moveUp(this._crawler, 0);
  		};
 		}
 		this._noBlock = true;
  	}

  	/*if(this._crawler.body.onWall()){
  		if(!this._trepa){
  		this._VSpeedAux *= -1;
  		this.movement = function(){
  					this.vSpeed = this._VSpeedAux;
  					this.moveUp(this._crawler, 0);
  				};
  		this._trepa = true;
  		this._cuelga = false;
  		}
  	}
  	else if(!this._cuelga){
  		this._HSpeedAux *= -1;
  		this._cuelga = true;
  		this._trepa = false;
  		this.movement = function(){
  					this.hSpeed = this._HSpeedAux;
  					this.moveRight(this._crawler, 0);
  				};
  	}
  	/*if(this._col){
  		switch(this._dir){
  			case 1:
  				this._crawler.body.y 
  				this._HSpeedAux *= -1;
  				this._dir = 0;
  				this.movement = function(){
  					this.hSpeed = this._HSpeedAux;
  					this.moveRight(this._crawler, 0);
  				};
  				break;
  			case 0:
  				this._VSpeedAux *= -1;
  				this._dir = 1;
  				this.movement = function(){
  					this.vSpeed = this._VSpeedAux;
  					this.moveUp(this._crawler, 0);
  				};
  				break;
  			}
  			this._col = false;
  		}*/
  }
  update(){
  	this.colision();
  	this.movement();
  	this.compruebaDir();
  	this.respawn();
  }

  movement(){
  	this.moveRight(this._crawler, 0);
  }
  ///-------------Lógica del crawler-----------///
 /* movement(){
    //Siempre se moverá hacia la dir del player hasta que choque con la pantalla

    if (!this._vertical && !this._cuelga){
      this.moveRight(this._, 0);
    }
    //O trepará una pared
    else if (this._vertical && !this._cuelga){
      this.moveUp(this._crawler, 90);
    }
    //O colgará del techo
    else if (!this._vertical && this._cuelga){
      this.moveLeft(this._crawler, 180);
    }
    else if (this._vertical && this._cuelga){
      this.moveDown(this._crawler, 270);
    }
  }*/
}
