/*
Clase madre de todos los enemigos, gestiona el movimiento básico y el daño
que hacen al jugador y que reciben del jugador.
*/
class Enemies extends Movable{
  //A los enemigos igual hay que añadirles gravedad, pero ya se va viendo
  //Constructor of the enemies
  constructor(posX, posY, gravity, sprite, speedX, speedY, colisionParedes, lives, damage, type, player){
    super(posX, posY, sprite, gravity, speedX, speedY);
    this.sprite.body.immovable = true;
    this.sprite.anchor.setTo(0.5, 0.5); //ancla
    this._damage = damage; //Damage to the player
    this._player = player;
    this._velocityTimer = 0; //tiempo el cual los enemigos son frenados al ser disparados (igual que en el juego original)
    this._hSpeedAux = this.hSpeed;
    this._vSpeedAux = this.vSpeed;
    this._posIniX = this.sprite.x - 15;
    this._posIniY = this.sprite.y - 20;
    this._resTimer = 0;
    var prueba = new Group();
    this._Botiquines = prueba.group;
    this._Botiquines.createMultiple(2, 'dropVida');
    this.VIDA_A_RECUPERAR = 5;
    var a = new Group();
    this._dropMisiles = a.group;
    this._dropMisiles.createMultiple(2, 'dropMisiles');
    this.AMMO_A_RECUPERAR = 2;
    if (type === 0){ //Tipo de enemigo que serán, pero sólo diferencia entre tanques y normales
      this._lives = lives; //Hit points
    }
    else {
      this._lives = lives * 2; //Hit points of a tank
    }
    this._auxLives = lives;
    this._seChoca = colisionParedes;
    this._haMuerto = false;
    this.spriteAux = null;
    this.H_VEL_REDUCIDA = 10; //velocidad a la que baja
    this.V_VEL_REDUCIDA = 10;
    this.TIEMPO_REDUCCION_VEL = 400; //tiempo que los enemigos estan lentos
    this.TIEMPO_RESPAWN = 10000; //tiempo al cual respawnean

    //--------------------Sonidos------------
    this._damageSound = game.add.audio('damage', 1, false); //Daño que recibe el enemigo
    this._deadSound = game.add.audio('dead', 1, false); //Muerte del enemigo
  }

  colision(){
  		game.physics.arcade.overlap(this.sprite, this._player.player, this.damagePlayer, null, this); //overlap con el jugador
  		for(var i = 0; i < this._player._arrayBalas.length; i++){ //colision con las balas del jugador
			 game.physics.arcade.collide(this.sprite, this._player._arrayBalas[i], function(enemie, bullet){bullet.animations.play('expl');bullet.lifespan = 100; this.get_Damaged();}, null, this);
		  }
      if(this._seChoca){ //hay algunos enemigos que atraviesan paredes (avispas)
       game.physics.arcade.collide(this.sprite, this._seChoca, this.col, null, this);
      }
      //if(this.spriteAux !== null){
        this.collectLoot();
      //}
		  this.reset();
  }

  damagePlayer(){
  	this._player.recoil_Damage(this.sprite.body.x, this._damage); //llama al método de rebote, daño e invulnerabilidad del jugador
  }

  get_Damaged(){
    this._damageSound.play();
  	this._lives--;
  	this.hSpeed = this.H_VEL_REDUCIDA;  //quita vida, reduce su velocidad y empieza el timer de velocidad bajada
  	this.vSpeed = this.V_VEL_REDUCIDA;
  	this._velocityTimer = game.time.now + this.TIEMPO_REDUCCION_VEL;
    if(this._lives <= 0){
      this._deadSound.play();
      this.killThis();
      this.loot();
    }
  }

  reset(){
  	if(game.time.now > this._velocityTimer){
  		this.hSpeed = this._hSpeedAux;  //resetea las velocidades (si ha sido ralentizado le devuelve su velocidad normal) y comprueba si ha muerto
  		this.vSpeed = this._vSpeedAux;
  	}
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  }

 killThis(){
 		this.sprite.kill();
    this._haMuerto = true;
    this._resTimer = game.time.now + this.TIEMPO_RESPAWN;
 }

 respawn(){ //respawn, si la camara/player esta suficientemente lejos de su punto de respawn y ha pasado el tiempo especificado, respawnea
    if(this._haMuerto && (this._posIniX + game.camera.width/2 < game.camera.x || game.camera.x + game.camera.width < this._posIniX)){
      if(game.time.now > this._resTimer){
        this.sprite.revive();
        this._lives = this._auxLives;
        this.sprite.body.x = this._posIniX;
        this.sprite.body.y = this._posIniY;
        this._haMuerto = false;
      }
    }
 }

 loot(){ 
  var rnd = Math.floor(Math.random()*10); //generacion numero random
  if(rnd === 0 || rnd === 8){
    var drop = this._Botiquines.getFirstExists(false);
    drop.reset(this.sprite.x - this.sprite.width/5, this.sprite.y);
    drop.lifespan = 5000; //duran 5 segunditos
  }
  else if((rnd === 2 || rnd === 9) && this._player._rockets !== undefined){
    var drop = this._dropMisiles.getFirstExists(false);
    drop.reset(this.sprite.x - this.sprite.width/5, this.sprite.y);
    drop.angle= -90;
    drop.lifespan = 5000;
  }
 }

 collectLoot(){
  game.physics.arcade.overlap(this._player.player, this._Botiquines, function(player, sprite){sprite.lifespan = 10; player.class.heal(this.VIDA_A_RECUPERAR);}, null, this);
  game.physics.arcade.overlap(this._player.player, this._dropMisiles, function(player, sprite){sprite.lifespan = 10; player.class.moreAmmo(this.AMMO_A_RECUPERAR);}, null, this);
 }

}
