//Toutes les durees sont en ticks
//Copyright 2014 StormWareReloaded

// Variables/matrices globales, objets indépendants
var canvas, context, map, selected, selectedTOnMap, turretInInterface, MouseX, MouseY, player, currentT, currentR, rad, texte, partie, compteurEclair, compteurSprite ,sprite, regen, debut, info;
var monstres = [];
var tourelles = [];
var statut = [];
var niveau =[[]];

var direction = {

	"BAS"     : 0,
	"HAUT"    : 1,
	"GAUCHE"  : 2,
	"DROITE"  : 3
}

var Type = {

	"SANS" : 0,
	"NORMAL" : 1,
	"MITRAILLETTE" : 2,
	"ELECTRIQUE" : 3
}

window.onload = function() { // Fonction main()

canvas = document.getElementById("fenetreDeJeu");
context= canvas.getContext("2d");
selected = 0;

    niveau = [ // Composition des vagues de n=1 à n=10
			[30, 15, 10],
			[40, 30, 15],
			[50, 45, 20],
			[50, 20, 50],
			[60, 35, 15],
			[70, 50, 40],
			[80, 60, 60],
			[55, 90, 45],
			[80, 80, 80],
			[10, 10, 150],
		 	 ];
    map = [ // Map "visuelle"
		[0,7,0,4,2,5,0,4,2,2,2,2,2,2,2,2,5,0,0,0,0,0,0,0,0],
		[0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,1,0,1,0,1,0,4,2,2,2,2,5,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,4,2,2,2,2,2],
		[0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
		[0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
		[0,1,0,1,0,1,0,3,2,6,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
		[0,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,3,2,2,2,5,0],
		[0,1,0,1,0,3,2,2,2,2,2,2,2,2,6,0,1,0,0,0,0,0,0,1,0],
		[0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0],
		[0,1,0,3,2,2,2,2,2,2,2,2,2,2,5,0,1,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,4,2,2,2,6,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0],
		[0,3,2,2,2,2,2,2,2,2,2,2,2,2,6,0,1,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],
		[0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,0,0,1,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
		[0,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,0,0,0,0,0]
			];
			
    mapDeplacement =[ // Organisation des chemins des monstres
		[0,2,0,1,0,2,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,2,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,25],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,-2,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0,-1,0],
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,-2,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,-2,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,-2,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0,0,0]
			];
	
			
    mapTourelles = [ // Les tourelles y sont placées
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];

    //Chargement des sprites

		tileSet = new Image();
		tileSet.src = "pics/tilesets/tileSet.png";
	
	tileSet.onload = function() {
		
		monstreNul = new Image();
		monstreNul.src = "pics/monstres/monstre.png";
	
	monstreNul.onload = function() {
	
		monstre2 = new Image();
		monstre2.src = "pics/monstres/monstre_2.png";
		
	monstre2.onload = function() {
	
		monstre3 = new Image();
		monstre3.src = "pics/monstres/monstre_regen.png";
		
	monstre3.onload = function() {
			
		background = new Image();
		background.src ="pics/tilesets/background.jpg";
				
	background.onload = function() {
				
		toutou1 = new Image();
		toutou1.src = "pics/tourelles/tourelle.png"		
				
	toutou1.onload = function() {
	
		toutou2 = new Image();
		toutou2.src = "pics/tourelles/tourelle_2.png";
		
	toutou2.onload = function() {
	
		toutou3 = new Image();
		toutou3.src = "pics/tourelles/tourelle_3.png";
		
	toutou3.onload=function() {
	
		projectile = new Image();
		projectile.src = "pics/tourelles/projectile.png";
		
	projectile.onload = function() {
	
		eclair=new Image();
		eclair.src= "pics/tourelles/Eclair.png";
		
	eclair.onload=function(){
		
		dollar = new Image();
		dollar.src = "pics/tilesets/dollar.png";
		
	dollar.onload = function() {
	
		coeur = new Image();
		coeur.src = "pics/tilesets/coeur.png"
		
	coeur.onload = function() {
	
		plaquette = new Image();
		plaquette.src = "pics/tilesets/plaquette.png";
		
	plaquette.onload = function() {
	
		rond = new Image();
		rond.src = "pics/tilesets/rond.png";
		
	rond.onload = function() {

		GameOver=new Image();
		GameOver.src = "pics/Interface/Game Over.png";
		
	GameOver.onload = function(){
	
		acceuil = new Image();
		acceuil.src = "pics/Interface/Acceuil.png";
		
	acceuil.onload=function(){
	
		rule = new Image();
		rule.src = "pics/Interface/Rules.png";
		
	rule.onload = function (){
	
		team = new Image();
		team.src = "pics/Interface/Team.png";
		
	team.onload = function (){

        bille = new Image();
        bille.src = "pics/tilesets/bille.png";

     bille.onload = function() {
	
         //Lancement de l'écran d'accueil

		debut = true;
		info = false;
		context.drawImage(acceuil, 0, 0, 500, 500, 0, 0, 960, 640);
					
    }}}}}}}}}}}}}}}}}}}
	
}


function cut(tableau, position) { // Utilisation : cut(["a", "b", "c"],1) -> ["a", "c"]

	for (var i=0; i<=tableau.length-position-1; i++) {
		tableau[i+position]=tableau[i+position+1]
	}
	tableau.pop();
	return tableau;
}

function deplacement(event) { // Appelée à chaque mouvement de la souris dans le canvas
	
	MouseX = getMousePosition(event).x;
	MouseY = getMousePosition(event).y;
	
	var caseX = Math.floor(MouseX/32);
	var caseY = Math.floor(MouseY/32);

    var cursor = 0;
		
	if (mapTourelles[caseY][caseX])	{	
		
		var ID = mapTourelles[caseY][caseX];
		selectedTOnMap = ID - 1;
		turretInInterface = -1;
	}
	else if (longueur(MouseX, MouseY, 840, 40)<=32) {
		selectedTOnMap = -1;
		turretInInterface = Type.NORMAL;
        cursor = "pointer";
	}
	else if (longueur(MouseX, MouseY, 920, 40)<=32) {
		selectedTOnMap = -1;
		turretInInterface = Type.MITRAILLETTE;
        cursor = "pointer";
	}
	else if (longueur(MouseX, MouseY, 840, 120)<=32) {
		selectedTOnMap = -1;
		turretInInterface = Type.ELECTRIQUE;
        cursor = "pointer";
	}
	else {
		selectedTOnMap = -1;
		turretInInterface = -1;
        cursor = "default";
	}

    if (MouseX>=canvas.width-130 && MouseX<=canvas.width-30 && MouseY>=350 && MouseY<=370) {
       var nombreDeBoutons = Math.round((MouseX - canvas.width + 130)/20);
        if (nombreDeBoutons>5) {
             nombreDeBoutons = 5;
        }
        if (nombreDeBoutons<1) {
            nombreDeBoutons = 1;
        }

        partie.vitesseJeu = nombreDeBoutons;
    }

    canvas.style.cursor = cursor;
}

function detectClic() { // Appelée à chaque clic dans le cnavas

    if(68<=MouseX&&MouseX<=131&&589<=MouseY&&MouseY<=614&&!debut&&info){ // Ecran d'accueil
		context.drawImage(acceuil, 0, 0, 500, 500, 0, 0, 960, 640);
		debut = true;
		info = false;
	}
	
    if(321<=MouseX&&MouseX<=683&&231<=MouseY&&MouseY<=282&&debut&&!info){ // Nouvelle partie
		player = new Joueur();
		currentR = -1;
		debut = false;
		texte = "";
		regen = 0;
		selectedTOnMap = -1;
		selectedTOnMap = -1;
		compteurEclair = 0;
		partie = new Game();
		jeu(monstres, tourelles, partie);
	}
	
    if(323<=MouseX&&MouseX<=693&&315<=MouseY&&MouseY<=365&&debut){ // Règles
		context.drawImage(rule, 0, 0, 500, 500, 0, 0, 960, 640);
		debut = false;
		info = true;	
	}
	
    if(327<=MouseX&&MouseX<=696&&395<=MouseY&&MouseY<=448&&debut){ // Crédits
		context.drawImage(team, 0, 0, 500, 500, 0, 0, 960, 640);
		debut = false;
		info = true;
	}
	
	
	
	if (longueur(MouseX, MouseY, 840, 40)<=32) {
		selected = Type.NORMAL;
		currentT = toutou1;
		rad = 128;
	}
	else if (longueur(MouseX, MouseY, 920, 40)<=32) {
		selected = Type.MITRAILLETTE;
		currentT = toutou2;
		rad = 256;
	}
	else if (longueur(MouseX, MouseY, 840, 120)<=32) {
		selected=Type.ELECTRIQUE;
		currentT=toutou3;
		rad=48;
	}
	else if (selected) {
		if((map[parseInt(MouseY/32)][parseInt(MouseX/32)]==0) && (mapTourelles[parseInt(MouseY/32)][parseInt(MouseX/32)]==0)){
			
			var url, dmg, radius, rate, price, type;
			switch (selected) {
				case 1:
					url = toutou1;
					dmg = 60;
					radius = 128;
					rate = 1;
					price = -100;
					type = Type.NORMAL;
				break;
				case 2:
					url = toutou2;
					dmg = 2;
					radius = 256;
					rate = 0.015;
					price = -300;
					type = Type.MITRAILLETTE;
				break;
				case 3:
					url= toutou3;
					dmg = 55;
					radius = 48;
					rate = 1;
					price= -200;
					type = Type.ELECTRIQUE;
				break;
				
			}
			if (player.budget(price)) {
				tourelles.push(new Tourelle(url, dmg, parseInt(MouseX/32)*32+16, parseInt(MouseY/32)*32+16, radius, rate, type));
				mapTourelles[parseInt(MouseY/32)][parseInt(MouseX/32)] = tourelles.length;//il faudra retrancher 1 pour trouver l'Id de la tourelle
			}
		selected = 0;	
		}
	}
}

function drawCircle(x, y, radius, colorStroke) { // Dessine un cercle grâce à la paramétrique

	context.strokeStyle = colorStroke;
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI*2, false);
	context.closePath();
	context.stroke();
}

function getPosition(element){ // Retourne la position d'un élément HTML de la page
    var top = 0, left = 0;
    
    while (element) {
        left   += element.offsetLeft;
        top    += element.offsetTop;
        element = element.offsetParent;
    }
    
    return { x: left, y: top };
}

function getMousePosition(event) { // Retourne la position du curseur
    if (event.pageX) {
        return {
            x: event.pageX,
            y: event.pageY
        };
    } 
	else {
        return { 
            x: event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, 
            y: event.clientY + document.body.scrollTop  + document.documentElement.scrollTop
        };
    }
}

window.requestAnimFrame = (function(){ // Fonction permettant d'avoir des FPS stables
    return window.requestAnimationFrame       || // La forme standardisée
           window.webkitRequestAnimationFrame || // Pour Chrome et Safari
           window.mozRequestAnimationFrame    || // Pour Firefox
           window.oRequestAnimationFrame      || // Pour Opera
           window.msRequestAnimationFrame     || // Pour Internet Explorer
           function(callback){                   // Sinon
               window.setTimeout(callback, 20);
           };
})();

function dessinerMap() { // Dessin des sprites de la map

	context.drawImage(background,0,0,800,canvas.height);

	for(var i=0; i<20;i++) {
		for(var j=0; j<25;j++) {
			switch(Math.abs(map[i][j])){
				case 1 : 
					context.drawImage(tileSet,0,0,32,32,j*32,i*32,32,32);
					break;
				case 2 :
					context.drawImage(tileSet,32,0,32,32,j*32,i*32,32,32);
					break;
				case 3 : 
					context.drawImage(tileSet,64,0,32,32,j*32,i*32,32,32);
					break;
				case 4 :
					context.drawImage(tileSet,96,0,32,32,j*32,i*32,32,32);
					break;
				case 5 : 
					context.drawImage(tileSet,0,32,32,32,j*32,i*32,32,32);
					break;
				case 6 :
					context.drawImage(tileSet,32,32,32,32,j*32,i*32,32,32);
					break;
				case 7 : 
					context.drawImage(tileSet,64,32,32,32,j*32,i*32,32,32);
					break;
			
			}

		}
	}
}

function dessinerInterface() { // Dessin de l'interface
	
	context.drawImage(coeur,  12, canvas.height - 86);
	context.drawImage(dollar, 12, canvas.height - 44);
	context.drawImage(plaquette, canvas.width-160, 0);
	
	for (var i=0; i<=3; i++) {
		context.drawImage(rond, canvas.width-160, i*80);
		context.drawImage(rond, canvas.width-80, i*80);
	}
	
	if (currentR!=-1) {
	
		var xR = (currentR % 2)*80;
		var yR = parseInt(currentR/2)*80;
		context.drawImage(rondA, 800+xR, yR);
	}
	
	context.drawImage(toutou1, 0, 0, 32, 32,  canvas.width-136, 24, 32, 32);
	context.drawImage(toutou1, 32, 0, 32, 32, canvas.width-136, 24, 32, 32);
	
	context.drawImage(toutou2, 0, 0, 32, 32,  canvas.width-56, 24, 32, 32);
	context.drawImage(toutou2, 32, 0, 32, 32, canvas.width-56, 24, 32, 32);
	
	context.drawImage(toutou3, 0, 0, 32, 32,  canvas.width-136, 104, 32, 32);
	context.drawImage(toutou3, 32, 0, 32, 32, canvas.width-136, 104, 32, 32);
	
	context.font = "bold italic 16pt Comic Sans MS, Arial";
	context.fillStyle = "white";
	context.fillText(player.money+"$", 52, canvas.height - 20);
	context.fillText(player.vie, 52, canvas.height - 62);
	
	context.strokeStyle = "rgb(255, 150, 39)";
	context.beginPath();
	context.moveTo(canvas.width-144, canvas.height-224);
	context.lineTo(canvas.width-16,  canvas.height-224);
	context.lineTo(canvas.width-16,  canvas.height-16);
	context.lineTo(canvas.width-144, canvas.height-16);
	context.closePath();
	context.stroke();
	
	if (tourelles[selectedTOnMap]) {
		var typeNom = "";
		switch(tourelles[selectedTOnMap].type){
			case 1 : typeNom = "Normal";
				break;
			case 2 : typeNom = "Mitraillette";
				break;
			case 3 : typeNom = "Electrique";
				break;
		}
		texte = "Type " + typeNom + 
				"\nDegats : " + tourelles[selectedTOnMap].degats +
				"\nPortee : " + tourelles[selectedTOnMap].radius +
				"\nVitesse : " + tourelles[selectedTOnMap].rate;
	}
	else if (turretInInterface>-1) {
		var url, dmg, radius, rate, price, type;
		switch (turretInInterface) {
			case 1:
				url = toutou1;
				dmg = 60;
				radius = 128;
				rate = 1;
				price = -100;
				type = Type.NORMAL;
			break;
			case 2:
				url = toutou2;
				dmg = 1;
				radius = 256;
				rate = 0.01;
				price = -400;
				type = Type.MITRAILLETTE;
			break;
			case 3:
				url= toutou3;
				dmg = 50;
				radius = 48;
				rate = 1;
				price= -200;
				type = Type.ELECTRIQUE;
			break;
		}
		switch(type){
			case 1 : type = "Normal";
				break;
			case 2 : type = "Mitraillette";
				break;
			case 3 : type = "Electrique";
				break;
		}
		texte = "Type : " + type + 
				"\nPrix : " + Math.abs(price) +
				"\nVitesse : " + rate +
				"\nPortée : " + radius +
				"\nDommages : " + dmg;
		
	}	
	else {
		texte = "Vague : " + partie.currentWave+
				"\nNombre de monstres \nrestants : " + (niveau[partie.currentWave-1][0]+niveau[partie.currentWave-1][1]+niveau[partie.currentWave-1][2]);
				
				 
	}

    for (var i=0; i<partie.vitesseJeu; i++) {
        context.drawImage(bille, 15, 0, 15, 15, canvas.width-130+20*i, 350, 15, 15);
    }
    for (var i=partie.vitesseJeu; i<5; i++) {
        context.drawImage(bille, 0, 0, 15, 15, canvas.width-130+20*i, 350, 15, 15);
    }
	
	setText();
}

function longueur(x1, y1, x2, y2) { // Distance entre A(x1;y1) et B(x2;y2)

	return (Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2)));
}

function Tourelle(url, degats, x, y, radius, rate, type) { // Classe tourelle

	this.url = url;
	this.degats = degats;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.rate = rate;
	this.targetted = false;
	this.ID = -1;
	this.compteur = 30;
	this.projectiles = [];
	this.type = type;
	
	if (this.type==Type.ELECTRIQUE) {
		this.tbElectricite = [];
	}
	
    this.dessiner = function() { // Dessin du sprite
		
		context.drawImage(this.url,0,0, 32,32,this.x-16,this.y-16,32,32);
		context.drawImage(this.url,32,0,32,32,this.x-16,this.y-16,32,32);
		
		for (var i=0; i<this.projectiles.length; i++) {
			if (!this.projectiles[i].auContact) {
				this.projectiles[i].deplacer();
				this.projectiles[i].dessiner();			
			}
			else {
				this.projectiles = cut(this.projectiles, i);
			}
		}
	}
		
    this.distance = function(monstre) {	 // Distance au monstre
		if (monstre) {
			return (Math.sqrt(Math.pow((this.x-monstre.posX-16), 2) + Math.pow((this.y-monstre.posY-16), 2)));		
		}
	} 
	
    this.target = function() { // Ciblage du monstre
		
			if (this.targetted) {
				//Distance toutou-monstre targetté
				var distance = this.distance(monstres[this.ID]);
				if (monstres[this.ID]) {
					if (distance > radius||!monstres[this.ID].vivant) {
						this.targetted = false;
						this.ID = -1;
					}
				}
			}
			else {
				
				var ID = -1;
				for (var i=0; i<monstres.length; i++) {
					if (radius>=this.distance(monstres[i]) && monstres[i].vivant==true) {
						ID = i;
						this.targetted = true;
						break;
					}
				}
				this.ID = ID;
			}
	}
	
    this.untarget = function() { // Déciblage du monstre
	
		if (monstres[this.ID]) {
			if (radius<this.distance(monstres[this.ID])||!monstres[this.ID].vivant) {
				
				this.ID = -1;
				this.targetted = false;
			}
		}
	}
    this.attack = function() { // Attaque la cible
	
		if (this.type!=Type.ELECTRIQUE) {
			if (this.targetted) {
				if (this.compteur/30 >= this.rate) {
					this.projectiles.push(new Projectile(this.x-8, this.y-8, "", 12, monstres[this.ID], this.degats));
					this.compteur = 0;
					
					if (monstres[this.ID]) {
						if (monstres[this.ID].vivant==false||this.distance(monstres[this.ID])) {
							this.ID = -1;
							this.targetted = false;
						}
					}
				}
			}
		}
		else {
			if(this.targetted){
				if (this.compteur/30>=this.rate && monstres[this.ID]){
					this.tbElectricite.push(new Electricite(monstres[this.ID].x, monstres[this.ID].y, monstres[this.ID], this));
					this.tbElectricite[0].genererChemin();
					this.compteur = 0;
					
					
					}
					this.tbElectricite = [];
					if (!compteurEclair) {
						for (var i=0; i<monstres.length; i++) {
							monstres[i].statut[0] = false;
						}
					}
				}
			}
		}
	}
;

function Joueur() { // Clase gérant le joueur

	this.vie = 50;
	this.money = 300;
	this.vivant = true;
	
    this.perdreVie = function(degats) { // Retranche les dégâts à la vie du joueur
	
		this.vie = this.vie - degats;
		
		if (this.vie<=0) {
			this.vie = 0;
			this.vivant = false;
		}
	}
	
    this.budget = function(argent) { // Gère les transactions
	
		if ((this.money+argent)>=0) {
		
			this.money = this.money + argent;
			return true;
		}
		return false;
	}
}

function Ennemi(vie,url,degat,x,y,vitesse,dollar,statut){ // Classe gérant les monstres

	this.vieMax=vie;
	this.vie=vie;
	this.url=url;
	this.degat=degat;
	this.posX=x*32;
	this.posY=y*32;
	this.x=x;
	this.y=y;
	this.compteur=0;
	this.direction=direction.BAS;
	this.vitesse=vitesse;
	this.vivant = true;
	this.dollar = dollar;
	this.statut = [false]; 
	this.sprite = 0 ;
	this.compteurSprite = 1;
	this.regen=0;
	
	
    this.dessinerMonstre = function() { // Dessin du sprite
		switch(this.url){
		case monstreNul:
			if (this.sprite == 21) this.compteurSprite = -1;
			else if (this.sprite==0) this.compteurSprite = 1;
			this.sprite += this.compteurSprite;
			context.drawImage(this.url, parseInt(this.sprite/3)*32, 0, 32, 32, this.posX, this.posY, 32, 32);
		break
		case monstre2:
			if (this.sprite == 27) this.sprite=0;
			else if (this.sprite==0) this.compteurSprite = 1;
			this.sprite += this.compteurSprite;
			context.drawImage(this.url,  parseInt(this.sprite/3)*32, 0, 32, 32, this.posX, this.posY, 32, 32);
		break;
		case monstre3:
			if (this.sprite == 21) this.compteurSprite=-1;
			else if (this.sprite==0) this.compteurSprite = 1;
			this.sprite += this.compteurSprite;
			context.drawImage(this.url, parseInt(this.sprite/3)*32, 0, 32, 32, this.posX, this.posY, 32, 32);
		break;
		}
		context.fillStyle = "rgb("+(parseInt(255-255*this.vie/this.vieMax))+","+(parseInt(255*this.vie/this.vieMax))+",0)";
		context.beginPath();
		context.moveTo(this.posX, this.posY-5);
		context.lineTo(this.posX+(this.vie/this.vieMax*32), this.posY-5);
		context.lineTo(this.posX+(this.vie/this.vieMax*32), this.posY-1);
		context.lineTo(this.posX, this.posY-1);
		context.closePath();
		context.fill();
		
	}
	
    this.perdreVie = function(degats) { // Inflige des dégâts au monstre
		this.vie = this.vie - degats;
		if (this.vie<=0) {
			this.vie = 0;
			this.vivant = false;
			player.budget(this.dollar);
			context.drawImage(this.url, 8*32, 0, 32, 32, this.posX, this.posY, 32, 32);
			
		}
	}
	
    this.gagnerVie = function(soin) { // Augmente la vie du monstre
		if(partie.currentWave*1,25*250>=this.vie){
		this.vie = this.vie + soin;
		
		}
		
	}
	
    this.deplacerMonstre = function() { // Déplace le monstre et/ou définit sa nouvelle direction

		switch (this.direction) {
			case direction.BAS :
				this.posY = this.posY + this.vitesse;
				this.compteur = this.compteur + this.vitesse;
				
				if (this.compteur>=32) {
					this.posY = this.posY - this.compteur + 32;
					this.compteur = 0;
					this.y++;
				}
				break;
				
			case direction.HAUT : 
				this.posY = this.posY - this.vitesse;
				this.compteur = this.compteur + this.vitesse;
				
				if (this.compteur>=32) {
					this.posY = this.posY + this.compteur - 32;
					this.compteur = 0;
					this.y--;
				}
				break;
				
			case direction.DROITE : 
				this.posX = this.posX + this.vitesse;
				this.compteur = this.compteur + this.vitesse;
				
				if (this.compteur>=32) {
					this.posX = this.posX - this.compteur + 32;
					this.compteur = 0;
					this.x++;
				}
				break;
				
			case direction.GAUCHE : 
				this.posX = this.posX - this.vitesse;
				this.compteur = this.compteur + this.vitesse;
				
				if (this.compteur>=32) {
					this.posX = this.posX + this.compteur - 32;
					this.compteur = 0;
					this.x--;
				}
				break;
		}
		if (this.compteur==0) {
		
			switch(mapDeplacement[this.y][this.x]){
			
				case 2:
					this.direction = direction.BAS;
				break;
				case -2:
					this.direction = direction.HAUT;
				break;
				case 1:
					this.direction = direction.DROITE;
				break;
				case -1:
					this.direction = direction.GAUCHE;
				break;
                case 25: // On est arrivés au bout de la route
					this.vivant = false;
					player.perdreVie(this.degat);
				break;
				default:				
				
				break;
		
			}
		}
	}
};

function Projectile(x, y, url, vitesse, cible, degats) { // Class gérant les projectiles
	
	this.url = url;
	this.vitesse = vitesse;
	this.cible = cible;
	this.auContact = false;
	this.x = x;
	this.y = y;
	this.depX = 0;
	this.depY = 0;
	this.degats = degats;
	
    this.deplacer = function() { // Mouvement du projectile ou détermination du vecteur vitesse
		
		if (this.cible) {
			if (this.cible.vivant&&this.depX==0&&this.depY==0&&!this.auContact) {
				var a = (this.y-(this.cible.posY+16))/(this.x-(this.cible.posX+16));
				var b = this.y - this.x*a;
				var n = vitesse/Math.sqrt( Math.pow(a, 2) + 1 );
				
				if (this.x>=this.cible.posX+16&&this.y>=this.cible.posY+16) {
					this.depX = -n;
					this.depY = -a*n;
				}			
				else if (this.x<=this.cible.posX+16&&this.y<=this.cible.posY+16) {
					this.depX = n;
					this.depY = a*n;
				}
				else if (this.x>=this.cible.posX+16&&this.y<=this.cible.posY+16) {
					this.depX = -n;
					this.depY = -a*n;
				}
				else if (this.x<=this.cible.posX+16&&this.y>=this.cible.posY+16) {
					this.depX = n;
					this.depY = a*n;
				}
			}
		}
		
				
		this.x = this.x + this.depX;
		this.y = this.y + this.depY;
		
		if (this.x<=0||this.x>=800||this.y<=0||this.y>=canvas.height) {
			this.auContact = true;
		}
		
		for (var i=0; i<monstres.length; i++) {
			if (longueur(this.x, this.y, monstres[i].posX+16, monstres[i].posY+16)<=16) {
				this.auContact = true;
				monstres[i].perdreVie(this.degats);
				if(monstres[i].url==monstre3){
					monstres[i].regen = 0;
					
				}
			}
		}		
	}
	
    this.dessiner = function() { // Dessin du sprite du projectile
		if (!this.auContact&&this.depX||this.depY) {
			context.drawImage(projectile, this.x, this.y);		
		}
	}
};

function Electricite(x, y, cible, parent) { // Classe gérant l'élelectricité lancée par les tourelles électriques
	
	this.ref = parent;
	this.x = x;
	this.y = y;
	this.cible = cible;
	
    this.genererChemin = function() { // Calcul du monstre suivant
		
		if (!this.cible.statut[0]) {
			for (var i=0; i<monstres.length; i++) {
				if (monstres[i].x==this.cible.x && monstres[i].y==this.cible.y && !monstres[i].statut[0]) {
                    monstres[i].perdreVie(this.ref.degats);
                    monstres[i].statut[0] = true;
					compteurEclair = 7;
					if(monstres[i].url==monstre3){
						monstres[i].regen = 0;
						
					}
                }
			}
				
            for (var i=0; i<monstres.length; i++) { // Initialisation du tronçon suivant
				if (longueur(monstres[i].posX, monstres[i].posY, this.cible.posX, this.cible.posY)<Math.sqrt(2)*32) {
					this.ref.tbElectricite.push(new Electricite(monstres[i].x, monstres[i].y, monstres[i], this.ref));
					this.ref.tbElectricite[parent.tbElectricite.length-1].genererChemin();
				}
			}
		}
		
	}
};

function dessinerEclair(){ // Dessin des sprites des éclairs
	if (compteurEclair>=0) {
		for(var i=0; i<monstres.length; i++){
			if(monstres[i] && monstres[i].statut[0]){
				switch(map[monstres[i].y][monstres[i].x]){
					case 1 : 
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,0,0,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
						}		
					break;	
					case 2 :
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,64,0,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
							
							}
					break;
					case 3 : 
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,128,0,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
							}
					break;
					case 4 :
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,32,32,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
						}
					case 5 : 
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,96,32,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
						}
					break;
					case 6 :
						if(monstres[i] && monstres[i].statut[0]){
							context.drawImage(eclair,0,64,32,32,monstres[i].x*32,monstres[i].y*32,32,32);
						}
					break;
				}
			}	
		}
		compteurEclair--;
	}
}

function Game() { // Classe gérant un game engine simplifié

	this.currentWave = 1;	
	this.vagueTerminee = false;
	this.compteur = 0;
	this.prochainEnvoi = 0;
    this.vitesseJeu = 1;
	
    this.envoyerVague = function() { // Envoi de la vague de monstres suivante
	
		if (this.prochainEnvoi<=this.compteur&&!this.vagueTerminee) {
		this.unite = Math.round(2*Math.random());
			switch (this.unite){
				case 0:
					if(niveau[this.currentWave-1][0]>0)
					{
					monstres.push(new Ennemi(this.currentWave*1.25*300, monstreNul, 1, 1, 0, 1,1));
					niveau[this.currentWave-1][0] = niveau[this.currentWave-1][0]-1;
					}
					else{
						this.unite++;
					}
				break;
				case 1:
					if(niveau[this.currentWave-1][1]>0)
					{
					monstres.push(new Ennemi(this.currentWave*1.25*450, monstre2, 2, 1, 0, 0.75,5));
					niveau[this.currentWave-1][1] = niveau[this.currentWave-1][1]-1;
					}
					else{
						this.unite++;
					}
				break;
				case 2:
					if(niveau[this.currentWave-1][2]>0)
					{
					monstres.push(new Ennemi(this.currentWave*1.25*250, monstre3, 3, 1, 0, 1.5,10));
					niveau[this.currentWave-1][2] = niveau[this.currentWave-1][2]-1;
					}
					else{
						this.unite=0;
					}
				break;
			}
			this.prochainEnvoi = Math.random()*(100/Math.pow(this.currentWave,1.1)); //  Nombre de ticks nécessaires avant la prochaine invocation
			this.compteur = 0;
			
			}
		
		
		
		if (!this.vagueTerminee&&!monstres[0]) {
			this.vagueTerminee = true;
			player.budget(parseInt(player.money*0.2));
			
		}
		
		if (this.vagueTerminee&&this.compteur>=250) {
		
			this.vagueTerminee = false;
			this.compteur = 0;
			this.currentWave++;
			this.prochainEnvoi = 0;
		}
		
		this.compteur++;
	}
	
	
};

function setText() { // Change le texte de la boîte de dialogue

	context.font = "10pt New Times Roman";
	context.fillStyle = "white";
	var ligne = "", yTexte = 208;
	var i = 0;
    while (texte[i]) { // Saut de ligne manuel
		while (texte[i]!='\n'&&texte[i]) {
			ligne += texte[i];
			i++;
		}
		context.fillText(ligne, canvas.width-138, canvas.height-yTexte);
		ligne = "";
		yTexte -= 15;
		i++;
	}
}

function jeu(monstres, tourelles, partie, difficulte, nombreMonstres) { // Boucle principale

	partie.envoyerVague();
	dessinerMap();
	for (var i=0; i<=monstres.length-1; i++) {
		if (monstres[i].vivant) {
			monstres[i].dessinerMonstre();
			monstres[i].deplacerMonstre();
			if(monstres[i].url==monstre3 && monstres[i].regen>40&&monstres[i].vie<partie.currentWave*1.42*250){
				monstres[i].gagnerVie(0.75);
				
			}
		}
		else {
			monstres = cut(monstres, i);
		}
	}
	
	for (var i=0; i<tourelles.length; i++) {
		if (tourelles[i]) {
			tourelles[i].dessiner();
			tourelles[i].target();
			tourelles[i].attack();
			tourelles[i].untarget();
			tourelles[i].compteur++;
		}
	}
	
	dessinerInterface();
	dessinerEclair();
	
	if (selected&&MouseX/32<=25&&MouseY/32<=20) {
		drawCircle(parseInt(MouseX/32)*32+16, parseInt(MouseY/32)*32+16, rad, "white");
		context.drawImage(currentT, 0, 0, 32, 32, parseInt(MouseX/32)*32, parseInt(MouseY/32)*32, 32, 32);
		context.drawImage(currentT, 32, 0, 32, 32, parseInt(MouseX/32)*32, parseInt(MouseY/32)*32, 32, 32);
	}
	if (selectedTOnMap!=-1) {
		drawCircle(tourelles[selectedTOnMap].x, tourelles[selectedTOnMap].y, tourelles[selectedTOnMap].radius, "white");
	}
	
	if (player.vie>0) {
		if (partie.vitesseJeu==1) requestAnimFrame(function(){jeu(monstres, tourelles, partie, difficulte, nombreMonstres);});
        else window.setTimeout(function(){jeu(monstres, tourelles, partie, difficulte, nombreMonstres);}, 20/Math.pow(partie.vitesseJeu,1.2));
	}
	else {
	
		while(monstres[0]) {
			monstres.pop();
		}
		context.drawImage(GameOver, 0, 0, 500, 500, 0, 0, 960, 640);	
	}
	for( var i=0; i<monstres.length; i++){
		monstres[i].regen++;
	}
	
}
