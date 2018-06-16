var loadState = {
	//preload es una funcion de phaser que se llama una sola vez y se suele usar para cargar los recursos
	preload: function(){

		var loading = game.add.text(80,150,'loading...',{font: '40px Courier', fill: '#FFF'}); //una textito de carga

		//game.load.image('dude', 'assets/PlayerThings/personaje.png'); //Cargamos tooodos los recursos que vamos a necesitar
		game.load.spritesheet('menu', 'assets/Menu/BckgrndMenuFull.png', 792, 600);
		game.load.image('title', 'assets/Menu/Title.png');
		game.load.image('things', 'assets/Menu/Things.png');
        game.load.image('block', 'assets/Map/Block.png');
		game.load.image('controles', 'assets/Menu/controles1.png');
        game.load.image('creditos', 'assets/Menu/creditos.png');
        game.load.spritesheet('metroido', 'assets/Menu/metroido.png', 23.7, 23);
		game.load.image('menuAux', 'assets/Menu/MenuLados.png');
		game.load.spritesheet('dude', 'assets/PlayerThings/samus3.png', 33, 64);
    	game.load.image('hand', 'assets/PowerUps/hand.png');
    	game.load.image('spike', 'assets/Enemies/spikes.png');
    	game.load.spritesheet('bala', 'assets/PlayerThings/bala.png', 112, 176);
    	game.load.spritesheet('rocket', 'assets/PlayerThings/rocket.png', 112, 176);
    	game.load.tilemap('mapaA', 'assets/Map/Brinstar5.json', null, Phaser.Tilemap.TILED_JSON); //el primer tile
    	game.load.image('gameTiles', 'assets/Map/tiles.png'); //las imagenes del tile
    	game.load.spritesheet('bomba', 'assets/PlayerThings/bomba.png', 25, 57);
    	game.load.spritesheet('door', 'assets/Map/door2.png', 127, 99);
        game.load.spritesheet('lDoor', 'assets/Map/lastDoor.png', 127, 99);
    	game.load.spritesheet('rocketDoor', 'assets/Map/rocketDoor.png', 160, 92);
    	game.load.spritesheet('wasp', 'assets/Enemies/wasp.png', 25, 24);
    	game.load.spritesheet('floater', 'assets/Enemies/floater.png', 30, 24);
    	game.load.spritesheet('bat', 'assets/Enemies/bat.png', 28, 45);
    	game.load.image('balaBat', 'assets/Enemies/balaBat.png');
        game.load.spritesheet('dropVida', 'assets/Enemies/drop.png', 12.5, 12);
        game.load.spritesheet('waver', 'assets/Enemies/waver.png', 25, 22);
        game.load.spritesheet('bee', 'assets/Enemies/bee.png', 38, 30);
        game.load.spritesheet('pot', 'assets/PlayerThings/pot.png', 28, 32);
        game.load.image('dropMisiles', 'assets/PlayerThings/dropMisiles.png');
        game.load.image('canvasEnergia', 'assets/Canvas/CanvasEnergia.png');
        game.load.image('canvasMisiles', 'assets/Canvas/CanvasMisiles.png');
        game.load.bitmapFont('font', 'assets/Canvas/try.png', 'assets/Canvas/try.fnt');//cargamos fuente del texto
				//Sonidos y música
				game.load.audio('jump', 'assets/Audios/jump.ogg');//Jump
				game.load.audio('shoot', 'assets/Audios/disparoSamantha.ogg');//Disparo
				game.load.audio('explosion', 'assets/Audios/explosi_n.ogg');//Explosión
				game.load.audio('dead', 'assets/Audios/enemyDead.ogg');//MuerteEnemigo
				game.load.audio('powerup', 'assets/Audios/mejora.ogg');//Mejora
				game.load.audio('object', 'assets/Audios/objeto.ogg');//objeto (vidas, misiles...)
				game.load.audio('damage', 'assets/Audios/sound.ogg');//DañoEnemigos
				game.load.audio('damageSamantha', 'assets/Audios/Da_oSamantha.ogg');//DañoSamantha
				game.load.audio('deadSamantha', 'assets/Audios/SamanthaDead.ogg');//Muerte de Samantha
		    game.load.audio('maintheme', 'assets/Audios/Title.ogg');
        game.load.audio('level', 'assets/Audios/Level.ogg');
		game.floaterGroup = new Group(); //Grupo que contendrá a los floaters del juego
    	console.log("Cargando..."); //simple debug
	},

	create: function(){
		//Llamamos al siguiente estado --> menu
		game.state.start('menu');
	}
};
