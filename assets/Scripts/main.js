window.onload = function (){
	////////////////////
	////Ekrāna Izmēri///
	///////////////////
	var izmersY=window.innerHeight;
	var izmersX=window.innerWidth;
    init(izmersX, izmersY);
    	// Glabā teksta stilus, piemeram, fonta izmers un krasa
	const saktTekstaStils = new PIXI.TextStyle({
    fill: "white",
    fontSize: 80
});
	const dalitTekstaStils = new PIXI.TextStyle({
    fill: "white",
    fontSize: 30
});
	const uzvaruTekstaStils = new PIXI.TextStyle({
    fill: "white",
    fontSize: 20
});
	//Mainīgais, kas glabā uzvaras tekstu
	var uzvara;
	//Mainīgie, kas glabā spēlētāja un dīlera uzvaras
	var spelUzvaras=0;
	var dilUzvaras=0;
	//Mainīgie, kas glabā spēlētāja un dīlera uzvaru tekstus
	var dilUzvarasTeksts;
	var spelUzvarasTeksts;
	// String priekš karts aizmugures nosaukuma
	var randomAizmugure =[
		"purple",
		"blue",
		"gray",
		"green",
		"red",
		"yellow"
	];
	shuffle(randomAizmugure);
	var kartsAizmugure = randomAizmugure[0] + "_back";
	//Dilera un speletaju kāršu vērtība
	var dilVert;
	var spelVert;
	var spelVertMasivs= [];
	var dilVertMasivs= [];
	//Dilera 1. kārts sākuma X un Y
	var dilX;
	var dilY;

	//Spēlētāja 1. kārts X un Y
	var spelX;
	var spelY;
	//Vērtību rādītāju mainīgie
	var spelVertX;
	var spelVertY;
	var dilVertX;
	var dilVertY;
	var spelVertTeksts;
	var dilVertTeksts;
	//Par cik pikseļiem tiks likta tālāk nākamā izdalītā kārts dīlerim vai spēlētājam
	var dilSolisX=90;
	var spelSolisX=35;
	//Masīvs kurā glabājas izdalīto kāršu bildes
	var cupa = [];
	//Masīvs kurā atrodas 52 kāršu nosaukumi
	var kombinets = [];
	//Masīvs kurā glabājas spēles laikā sajaukta kava
	var kava=[];
	//Objekts kas var atrast kārts vērtību pēc nosaukuma
	var vertibas = {};
	// Mainīgais, kas glabā fonu
	var fons;
	// Izdalīt pogas bilde un teksts
	var dalitPoga=[];
	// Pietiek pogas bilde un teksts
	var pietiekPoga=[];
	// Sakt pogas bilde un teksts
	var saktPoga;
	var saktTeksts;
	// Massīvi kas glabē izdalīto kāršu bildes
	var spelIzdalitasKartis=[];
	var dilIzdalitasKartis=[];
	// Masīvs kas glabā spēlētājam iedalīto kāršu nosaukumus
	var spelKava=[];
	// Masīvs kas glabā dīlera iedalīto kāršu nosaukumus
	var dilKava=[];
    var cipari =[
    	"2",
    	"3",
    	"4",
    	"5",
    	"6",
    	"7",
    	"8",
    	"9",
    	"10",
    	"J",
    	"Q",
    	"K",
    	"A",
    ];
    var zimes =[
    	"H",
    	"D",
    	"S",
    	"C",
    ];
    //Tiek sakombinēti cipari un pārējie ar zīmēm, piem 5 + ercens. Un tiek piešķirtas vērtības
	for (var i=0;i<cipari.length;i++)
	{
		for (var j=0;j<zimes.length;j++)
		{
			kombinets.push(cipari[i]+zimes[j]);
			if (i<9)
			{
				vertibas[kombinets[kombinets.length-1]]=i+2;
				//console.log(cipari[i]);
			}
			if (i==9)
			{
				vertibas[kombinets[kombinets.length-1]]=2;
			}
			if (i==10)
			{
				vertibas[kombinets[kombinets.length-1]]=3;
			}
			if (i==11)
			{
				vertibas[kombinets[kombinets.length-1]]=4;
			}
			if (i==12)
			{
				vertibas[kombinets[kombinets.length-1]]=11;
			}

		}
	}
	menu();
	function menu()
	{
		clearGame();
		fons=backgroundImage(0, 0, "img/background.jpg");
		saktPoga=rectangle(izmersX/2-100, izmersY/2-50, 200, 100, COLOR_TEAL);

		saktTeksts= text(izmersX/2, 10, "Sākt", saktTekstaStils);
		move(saktTeksts, izmersX/2-saktTeksts.width/2, izmersY/2-saktTeksts.height/2);
		onClick(saktPoga, function()
			{
				sakt();
			});
	}
	function sakt()
	{
		
		
		//console.log(kava[0]);
		cupa=[
			karts(izmersX-100, 20, bilde(kartsAizmugure)),
			karts(izmersX-98, 17, bilde(kartsAizmugure)),
			karts(izmersX-96, 14, bilde(kartsAizmugure)),
			karts(izmersX-94, 11, bilde(kartsAizmugure)),
		]

		remove(saktPoga);
		remove(saktTeksts);
		dalitPoga =[
			rectangle(50, izmersY-100, 100, 50, COLOR_TEAL),
			text(60, izmersY-93, "Izdalīt", dalitTekstaStils)
		];
		onClick(dalitPoga[0], function(){
			saktDalit();
		});
	}
	function saktDalit()
	{	
		if (dilUzvarasTeksts)
		{
			remove(dilUzvarasTeksts);
		}
		if (spelUzvarasTeksts)
		{
			remove(spelUzvarasTeksts);
		}
		dilUzvarasTeksts = text(50, izmersY/2-50, "Dīlera uzvaras: " + dilUzvaras, uzvaruTekstaStils);
		spelUzvarasTeksts= text(50, izmersY/2+50, "Spēlētāja uzvaras: " + spelUzvaras, uzvaruTekstaStils);

		if (uzvara)
		{
			remove(uzvara);
			uzvara = null;
		}
		if (dilVertTeksts)
		{
			remove(dilVertTeksts);
		}
		if (spelVertTeksts)
		{
			remove(spelVertTeksts);
		}
		spelKava=[];
		dilKava=[];
		//console.log("dilKava: " + dilKava.length);
		//console.log("spelKava: " + spelKava.length);
		spelVertMasivs=[];
		dilVertMasivs=[];
		kava=[];
		//console.log("Kavas izmērs: " + kava.length);
		for (var i=spelIzdalitasKartis.length-1;i>=0;i--)
		{
			remove(spelIzdalitasKartis[i]);
			spelIzdalitasKartis.pop();
		}
		for (var i=dilIzdalitasKartis.length-1;i>=0;i--)
		{
			remove(dilIzdalitasKartis[i]);
			dilIzdalitasKartis.pop();
		}
		//console.log("dilIzdalitasKartis: " + dilIzdalitasKartis.length);
		//console.log("spelIzdalitasKartis: " + spelIzdalitasKartis.length);
		dilVert=0;
		spelVert=0;
		dilX=izmersX/2-(izmersX/2/2);
		dilY=100;
		spelX=izmersX/2-(izmersX/2/2);
		spelY=izmersY-200;
		dilVertX=dilX-200;
		dilVertY=dilY;
		spelVertX=spelX-200;
		spelVertY=spelY;
		//Kava ir kombineta masiva kopija
		kava=[...kombinets];
		shuffle(kava);
		disableClick(dalitPoga[0]);
		onClick(cupa[3], function(){
			spelIzdalit();
		});
		//Izdala sakuma kartis
		for (var i=1;i<5;i++)
		{
			var ped=kava.length-1;
			if (i%2==0)
			{
				dilKava.push(kava[ped]);
				if (i==2)
				{
					animacija(kava[ped], izmersX-94, 11, dilX, dilY, 1);
					dilVert+=vertibas[kava[ped]];
				}
				else
				{
					animacija(kartsAizmugure, izmersX-94, 11, dilX, dilY, 1);
				}
				dilX+=dilSolisX;
				dilVertMasivs.push(vertibas[kava[ped]]);
				//console.log("Dilera vert: " + dilVert);
			}
			else
			{
				spelKava.push(kava[ped]);
				spelVert+=vertibas[kava[ped]];
				animacija(kava[ped], izmersX-94, 11, spelX, spelY, 0);
				spelX+=spelSolisX;
				//console.log("Speletaja vert: " + spelVert);
				spelVertMasivs.push(vertibas[kava[ped]]);
			}
			kava.pop();
		}
		dilVertTeksts=text(dilVertX, dilVertY, "Vērtība: " + dilVert, dalitTekstaStils);
		spelVertTeksts=text(spelVertX, spelVertY, "Vērtība: " + spelVert, dalitTekstaStils);
		pietiekPoga =[
			rectangle(izmersX-150, izmersY-100, 100, 50, COLOR_TEAL),
			text(izmersX-145, izmersY-93, "Pietiek", dalitTekstaStils)
		];
		onClick(pietiekPoga[0], function(){
			pietiek();
		});
	}

	function spelIzdalit()
	{
		var ped=kava.length-1;
		//console.log("Kavas izmers spelIzdalit: " + ped);
		spelKava.push(kava[ped]);
		spelVert+=vertibas[kava[ped]];
		animacija(kava[ped], izmersX-94, 11, spelX, spelY, 0);
		spelX+=spelSolisX;
		
		spelVertMasivs.push(vertibas[kava[ped]]);
		kava.pop();
		remove(spelVertTeksts);
		if (spelVert>21)
		{
			for (var i=0; i<spelVertMasivs.length;i++)
			{
				if (spelVertMasivs[i]==11)
				{
					spelVertMasivs[i]=1;
					spelVert-=10;
					break;
				}
			}
		}
		spelVertTeksts=text(spelVertX, spelVertY, "Vērtība: " + spelVert, dalitTekstaStils);
		if (spelVert>21)
		{
			sadedzis();
		}
		if (spelVert==21)
		{
			pietiek();
		}
	}

	function dilIzdalit()
	{
		var ped=kava.length-1;
		remove(dilIzdalitasKartis[1]);
		dilIzdalitasKartis.pop();
		dilX-=dilSolisX;
		dilVert+=dilVertMasivs[1];
		animacija(dilKava[1], izmersX-94, 11, dilX, dilY, 1);
		dilX+=dilSolisX;
		//console.log("Šeit jābūt 2: " + dilIzdalitasKartis.length);
		remove(dilVertTeksts);
		dilVertTeksts=text(dilVertX, dilVertY, "Vērtība: " + dilVert, dalitTekstaStils);
		while (dilVert<17)
		{
				 ped=kava.length-1;
				animacija(kava[ped], izmersX-94, 11, dilX, dilY, 1);
				dilVert+=vertibas[kava[ped]];
				//console.log("Kavas karts: " + kava[ped] + " DilVert: " + dilVert + " vertibas[kava[ped]]: " + vertibas[kava[ped]]);
				dilX+=dilSolisX;
				dilVertMasivs.push(vertibas[kava[ped]]);
				kava.pop();
				if (dilVert>21)
				{
					for (var i=0; i<dilVertMasivs.length;i++)
					{
						if (dilVertMasivs[i]==11)
						{
							dilVertMasivs[i]=1;
							dilVert-=10;
							break;
						}
					}
				}
				remove(dilVertTeksts);
				dilVertTeksts=text(dilVertX, dilVertY, "Vērtība: " + dilVert, dalitTekstaStils);

		}
		rezultati(0);
	}

	function sadedzis()
	{

		disableClick(cupa[3]);
		disableClick(pietiekPoga[0]);
		rezultati(1)
	}

	function pietiek()
	{
		disableClick(cupa[3]);
		disableClick(pietiekPoga[0]);
		dilIzdalit();
	} 

	function rezultati(g)
	{
		var kursUzvareja=-1;
		//kursUzvareja=1 Nozīmē, ka spēlētājs Uzvarēja
		//kursUzvareja=0 Nozīmē, ka dīleris Uzvarēja
		//kursUzvareja=2 Neizšķirts
		//kursUzvareja=3 Spēlētājs pārdega
		if (g==1)
		{
			kursUzvareja=3;
		}
		else
		{
			if (dilVert>21)
			{
				kursUzvareja=0;
			}
			else
			{
				if (dilVert>spelVert)
				{
					kursUzvareja=1;
				}
				else
				{
					if (dilVert==spelVert)
					{
						kursUzvareja=2;
					}
					else
					{
						kursUzvareja=0;
					}
				}
			}
		}
		if (kursUzvareja==0)
		{
			spelUzvaras+=1;
		}
		else
		{
			if (kursUzvareja==1 || kursUzvareja==3)
			{
				dilUzvaras+=1;
			}
		}
		apsveicu(kursUzvareja);
	}

	function apsveicu(kursUzvareja)
	{
		var uzvarasTeksti=[
			"Apsveicu Tevi ar uzvaru!",
			"Diemžēl dīleris uzvarēja!",
			"Neizsķirts!",
			"Diemžēl Tu pārdegi"
		];
		uzvara=text(0, 0, uzvarasTeksti[kursUzvareja], saktTekstaStils);
		move(uzvara, izmersX/2-uzvara.width/2, izmersY/2-uzvara.height/2);
		onClick(dalitPoga[0], function(){
			saktDalit();
		});
	}

	function animacija(g, sakX, sakY, beigX, beigY, kurs)
	{
		if (kurs==0)
		{
			spelIzdalitasKartis.push(karts(beigX, beigY, bilde(g)));
		}
		else
		{
			dilIzdalitasKartis.push(karts(beigX, beigY, bilde(g)));
			//console.log(dilIzdalitasKartis.length);
		}
	}

	//victory();
//Izvada consolē kursora kordinātas, kad nospiež W
   function getPosMouse()
   {
   		var mousePosition = renderer.plugins.interaction.mouse.global;
   		console.log(mousePosition);
   }
    onKeyDown(KEY_UP, function(){
        getPosMouse();
    });
    //Funkcija, kas izpildās noteiktas reizes sekundē
    animate(function(){

    });
    /**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	}
	function bilde(a)
	{
		var gatavaLokacija="img/" + a + ".png";
		return gatavaLokacija;
	}
	
};
