/*ordre des cases   |1	2	3|
					|4	5	6|
					|7	8	9|
*/
var canvas,context,MouseX,MouseY,partie,compteTour,scoreJ,scoreO,gagnantJ,gagnantO ; 
var carte=[[]];
window.onload=function () {

	canvas = document.getElementById("fenetreDeJeu");
	context= canvas.getContext("2d");
	compteTour=0
	carte= [[0, 0, 0],			// represente pour l'ordinateur la disposition des pions de chaque joueur. Le joueur est représenté pas un 1 et l'ordinateur pas un 2.
			[0, 0, 0],
			[0, 0, 0],
		    ];
	fond= new Image();
	fond.src="Images/fond.png";
	
	fond.onload = function () {
	
	croix = new Image();
	croix.src = "Images/croix.png";
	
	croix.onload = function () {
	
	rond = new Image();
	rond.src = "Images/rond.png";
	
	rond.onload = function () {
	
	finJ = new Image();
	finJ.src = "Images/FinJ.png";
	
	finJ.onload = function () {
	
	finO = new Image();
	finO.src = "Images/FinO.png";
	
	finO.onload=function(){
	
	fin= new Image();
	fin.src="Images/Fin.png";
	
	fin.onload = function(){
	
	blanc = new Image();
	blanc.src = "Images/Blanc.png";
	
	blanc.onload = function(){
		
		context.drawImage(fond,0,0,500,500,0,0,500,500);// (nomImage,4 coord pour délimiter zone image à prendre(x/y debut et x/y fin), 2 coord pour determiner zone ou placer coin sup gauche sur context, dim de l'image);
		partie = true;
		scoreO=scoreJ=0;
		gagnantO=gagnantJ=false;
	}}}}}}}
}

function detectClic (){
	if(0<MouseX&&MouseX<173&&0<MouseY&&MouseY<173){
		if(carte[0][0]==0 && partie){	
			carte[0][0]=1;
			dessinerCase(1,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(180<MouseX&&MouseX<338&&0<MouseY&&MouseY<173){
		if(carte[0][1]==0 && partie){
			carte[0][1]=1;
			dessinerCase(2,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(345<MouseX&&MouseX<500&&0<MouseY&&MouseY<173){
		if(carte[0][2]==0 && partie){
			carte[0][2]=1;
			dessinerCase(3,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(0<MouseX&&MouseX<173&&180<MouseY&&MouseY<340){
		if(carte[1][0]==0&& partie){
			carte[1][0]=1;
			dessinerCase(4,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(180<MouseX&&MouseX<338&&180<MouseY&&MouseY<340){
		if(carte[1][1]==0 && partie){
			carte[1][1]=1;
			dessinerCase(5,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(345<MouseX&&MouseX<500&&180<MouseY&&MouseY<340){
		if(carte[1][2]==0 && partie){
			carte[1][2]=1;
			dessinerCase(6,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(0<MouseX&&MouseX<173&&346<MouseY&&MouseY<500){
		if(carte[2][0]==0 && partie){
			carte[2][0]=1;
			dessinerCase(7,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(180<MouseX&&MouseX<338&&346<MouseY&&MouseY<500){
		if(carte[2][1]==0 && partie){
			carte[2][1]=1;
			dessinerCase(8,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(345<MouseX&&MouseX<500&&346<MouseY&&MouseY<500){
		if(carte[2][2]==0 && partie){
			carte[2][2]=1;
			dessinerCase(9,rond);
			compteTour++;
			parti();
			if(partie){
				tourOrdinateur();
				}
			}
	}else if(582<MouseX && MouseX<947&&202<MouseY&&MouseY<255&& !partie){
			partie=true;
			gagnantJ=gagnantO=false;
			compteTour=0
			carte= [[0, 0, 0],		
					[0, 0, 0],
					[0, 0, 0],
				    ];
			context.drawImage(fond,0,0,500,500,0,0,500,500);
			context.drawImage(blanc,0,0,500,500,500,0,500,500);
	}
}

function deplacement(event) { // Appelée à chaque mouvement de la souris dans le canvas
	
	MouseX = getMousePosition(event).x;
	MouseY = getMousePosition(event).y;
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

function dessinerCase(numero, image){
	var x,y;
	switch(numero){
		case 1:
			x=y=0;
		break;
		case 2:  
			x=170;
			y=0;
		break;
		case 3:
			x=340;
			y=0;
		break;
		case 4:  
			x=0;
			y=170;
		break;
		case 5:  
			x=170;
			y=170;
		break;
		case 6:  
			x=340;
			y=170;
		break;
		case 7:  
			x=0;
			y=340;
		break;
		case 8:  
			x=170;
			y=340;
		break;
		case 9:  
			x=340;
			y=340;
		break;
	}
	context.drawImage(image,0,0,160,160,x,y,160,160);
}// permet de dessiner l'image 'image' dans la case numero 'numero'

function tourOrdinateur(){
	if(partie){
		if(carte[0][1]==carte[0][2] && carte[0][1]!=0 && carte[0][0]==0){
			carte[0][0]=2;
			dessinerCase(1,croix);
			parti();
		}else if(carte[0][0]==carte[0][2] && carte[0][0]!=0 && carte[0][1]==0){
			carte[0][1]=2;
			dessinerCase(2,croix);
			parti();
		}else if(carte[0][0]==carte[0][1] && carte[0][0]!=0 && carte[0][2]==0){
			carte[0][2]=2;
			dessinerCase(3,croix);
			parti();
		}else if(carte[1][1]==carte[1][2] && carte[1][1]!=0 && carte[1][0]==0){
			carte[1][0]=2;
			dessinerCase(4,croix);
			parti();
		}else if(carte[1][0]==carte[1][2] && carte[1][0]!=0 && carte[1][1]==0){
			carte[1][1]=2;
			dessinerCase(5,croix);
			parti();
		}else if(carte[1][0]==carte[1][1] && carte[1][0]!=0 && carte[1][2]==0){
			carte[1][2]=2;
			dessinerCase(6,croix);
			parti();
		}else if(carte[2][1]==carte[2][2] && carte[2][1]!=0 && carte[2][0]==0){
			carte[2][0]=2;
			dessinerCase(7,croix);
			parti();
		}else if(carte[2][0]==carte[2][2] && carte[2][0]!=0 && carte[2][1]==0){
			carte[2][1]=2;
			dessinerCase(8,croix);
			parti();
		}else if(carte[2][0]==carte[2][1] && carte[2][0]!=0 && carte[2][2]==0){
			carte[2][2]=2;
			dessinerCase(9,croix);
			parti();
		}else if(carte[1][1]==carte[2][2] && carte[1][1]!=0 && carte[0][0]==0){
			carte[0][0]=2;
			dessinerCase(1,croix);
			parti();
		}else if((carte[0][0]==carte[2][2] && carte[0][0]!=0 && carte[1][1]==0) || (carte[0][2]==carte[2][0] && carte[0][2]!=0 && carte[1][1]==0)){
			carte[1][1]=2;
			dessinerCase(5,croix);
			parti();
		}else if(carte[0][0]==carte[1][1] && carte[0][0]!=0 && carte[2][2]==0){
			carte[2][2]=2;
			dessinerCase(9,croix);
			parti();
		}else if(carte[1][1]==carte[2][0] && carte[1][1]!=0 && carte[0][2]==0){
			carte[0][2]=2;
			dessinerCase(3,croix);
			parti();
		}else if(carte[0][2]==carte[1][1] && carte[0][2]!=0 && carte[2][0]==0){
			carte[2][0]=2;
			dessinerCase(7,croix);
			parti();
		}else if(carte[1][0]==carte[2][0] && carte[1][0]!=0 && carte[0][0]==0){
			carte[0][0]=2;
			dessinerCase(1,croix);
			parti();
		}else if(carte[0][0]==carte[2][0] && carte[0][0]!=0 && carte[1][0]==0){
			carte[1][0]=2;
			dessinerCase(4,croix);
			parti();
		}else if(carte[0][0]==carte[1][0] && carte[0][0]!=0 && carte[2][0]==0){
			carte[2][0]=2;
			dessinerCase(7,croix);
			parti();
		}else if(carte[1][1]==carte[2][1] && carte[1][1]!=0 && carte[0][1]==0){
			carte[0][1]=2;
			dessinerCase(2,croix);
			parti();
		}else if(carte[0][1]==carte[2][1] && carte[0][1]!=0 && carte[1][1]==0){
			carte[1][1]=2;
			dessinerCase(5,croix);
			parti();
		}else if(carte[0][1]==carte[1][1] && carte[0][1]!=0 && carte[2][1]==0){
			carte[2][1]=2;
			dessinerCase(8,croix);
			parti();
		}else if(carte[1][2]==carte[2][2] && carte[1][2]!=0 && carte[0][2]==0){
			carte[0][2]=2;
			dessinerCase(3,croix);
			parti();
		}else if(carte[0][2]==carte[2][2] && carte[0][2]!=0 && carte[1][2]==0){
			carte[1][2]=2;
			dessinerCase(6,croix);
			parti();
		}else if(carte[0][2]==carte[1][2] && carte[0][2]!=0 && carte[2][2]==0){
			carte[2][2]=2;
			dessinerCase(9,croix);
			parti();
		}else{
			var a=Math.floor((Math.random()*100)%10);
			var iCase,jCase
			switch(a){
				case 1:
					iCase=jCase=0;
				break;
				case 2:  
					iCase=0;
					jCase=1;
				break;
				case 3:
					iCase=0;
					jCase=2;
				break;
				case 4:  
					iCase=1;
					jCase=0;
				break;
				case 5:  
					iCase=1;
					jCase=1;
				break;
				case 6:  
					iCase=1;
					jCase=2;
				break;
				case 7:  
					iCase=2;
					jCase=0;
				break;
				case 8:  
					iCase=2;
					jCase=1;
				break;
				case 9:  
					iCase=2;
					jCase=2;
				break;
			}
			
			if(a!=0 && carte[iCase][jCase]==0){
				carte[iCase][jCase]=2
				dessinerCase(a,croix);
				parti();
			}else{
				tourOrdinateur();
			}
		}
	}
}

function parti(){
	if(compteTour<5){
		partie=true;
		for(var i=0;i<=2;i++){
			if((carte[i][0]==carte[i][1] && carte[i][1]==carte[i][2] && carte[i][1]==1)||(carte[0][i]==carte[1][i] && carte[1][i]==carte[2][i] && carte[0][i]==1)||(carte[0][0]==carte[1][1] && carte[1][1]==carte[2][2] && carte[1][1]==1)||(carte[0][2]==carte[1][1] && carte[2][0]==carte[0][2] && carte[1][1]==1)){
				partie=false;
				context.drawImage(finJ,0,0,500,500,500,0,500,500);
				gagnantJ=true; // étant dans une boucle je suis obligé de passer par un boolean pour permettre l'implémentation des scores sinon ils vont de trois en trois ...
			}else if((carte[i][0]==carte[i][1] && carte[i][1]==carte[i][2] && carte[i][1]==2)||(carte[0][i]==carte[1][i] && carte[1][i]==carte[2][i] && carte[0][i]==2)||(carte[0][0]==carte[1][1] && carte[1][1]==carte[2][2] && carte[1][1]==2)||(carte[0][2]==carte[1][1] && carte[2][0]==carte[0][2] && carte[1][1]==2)){
				partie=false;
				context.drawImage(finO,0,0,500,500,500,0,500,500);
				gagnantO=true;	
			}
		}
		if(gagnantJ){
			scoreJ++;
		}else if(gagnantO){
			scoreO++;
		}
		if(!partie){
			context.font = "bold italic 24pt Comic Sans MS, Arial";
			context.fillStyle = "black";
			context.fillText(scoreJ, 590, 400);
			context.fillText(scoreO, 900, 400);
		}
}else if(compteTour==5){
				partie=false;
				context.drawImage(fin,0,0,500,500,500,0,500,500);
}
}
