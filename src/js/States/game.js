var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'); //Creamos el Juego
console.log('hey');
//Añadimos los estados
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('controles', ControlesState);

//Tras haber añadido todos los estados correspondientes, iniciamos el primer estado
game.state.start('boot');
