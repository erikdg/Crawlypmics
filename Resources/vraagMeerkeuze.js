/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('vraag4pictures1word.js');
var vraagMeerkeuze = Ti.UI.createWindow({
  backgroundColor: 'white'
});

	var titel;
	var vraagTonen;
	var brandView;
	
function vraagToevoegen() {
	
	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT count(groepID) FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var aantalDeelnemers = selectAantalDeelnemers.fieldByName('count(groepID)');
	
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = ? AND rowid = ?', deelnemersGroepID, deelnemersCafe1);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	console.log(naam);
	
	// Haal cafes op bij gekozen thema
	var selectCafe = db.execute("SELECT DISTINCT cafe.cafeID, cafe.cafe_naam, cafe.themaID FROM cafe INNER JOIN deelnemersgroep ON cafe.themaID = deelnemersgroep.themaID WHERE groepID = ? LIMIT 1", deelnemersGroepID);
	var cafeCafeID = selectCafe.fieldByName('cafeID');
	var cafeNaam = selectCafe.fieldByName('cafe_naam');
		
	// Haal vraag random op
	var selectVraag = db.execute("SELECT vraag, vraagID FROM vragen WHERE cafeID=? AND vraag_type=1 ORDER BY RANDOM()", cafeCafeID);
	var vragenVraagID = selectVraag.fieldByName('vraagID');
	var vragenVraag = selectVraag.fieldByName('vraag');
 
	// Haal antwoorden van vraag op
	var selectAntwoorden = db.execute("SELECT antwoord, goedfout FROM antwoorden WHERE vraagID =? ORDER BY RANDOM()", vragenVraagID);
	var antwoordenAntwoord = selectAntwoorden.fieldByName('antwoord');
	var antwoordenGoedfout = selectAntwoorden.fieldByName('goedfout');
	
	
	
	// Toon voor wie de vraag is
	titel = Ti.UI.createLabel({
    	color: 'black',
    	text: 'Deze vraag is voor '+ naam + '',
    	font: { fontSize: 14, fontFamily: 'Helvetica Neue' },
    	right:25,
 		left:25,
 		top:60
	});

	// Toon de vraag
	vraagTonen = Ti.UI.createLabel({
    	color: 'black',
    	text: ''+ vragenVraag + '',
    	font: { fontSize: 15, fontFamily: 'Helvetica Neue' },
    	right:25,
 		left:25,
 		top:90
	});
	
	// Toon de antwoorden
	// Primary view voor de buttons
	brandView = Ti.UI.createView({
   		title : 'Hello',
    	width : '100%',
   		height : '100%',
    	top: '190dp',
    	layout: 'vertical'
	});
	
	
	var buttonArray = [];
	
	// fetch rows
	while (selectAntwoorden.isValidRow()) {
 		
   		//create Button with name and title
   		var myButton = Ti.UI.createButton({
   	    	buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    	title : selectAntwoorden.fieldByName('antwoord'),
   	    	tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    	width : '230dp',
   	    	height : '30dp',
        	top: '10dp'
   		});
    	
    	addlistener(myButton);
    
    	// Button toevoegen aan de view
		brandView.add(myButton);
 
    	// push button to array, if we maybe need it later
		buttonArray.push(myButton);
 
    	// get next row
  		selectAntwoorden.next();
    	
	}
	
	// always close rowset and db connection!
	selectAntwoorden.close();
	
	
	

	if (deelnemersCafe1 < aantalDeelnemers +1) {
		
		vraagMeerkeuze.add(brandView);
		vraagMeerkeuze.add(vraagTonen);
		vraagMeerkeuze.add(titel);
		
	} else {		
       	db.execute('UPDATE deelnemersgroep SET cafe1=1 WHERE groepID = ?', deelnemersGroepID);
 		db.close();
 		vraag4pictures1word.open();
	}
	db.close();
};

	
	

	function addlistener(inobj) {
           inobj.addEventListener('click',function(e){
            if (e.source.tagsID === 1) {
 	
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                
 				// Sla op bij welke vraag het spel is
 				var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
                var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
                db.execute('UPDATE deelnemersgroep SET cafe1= cafe1+1 WHERE groepID = ?', deelnemersGroepID);
 
 				// Toon dat het antwoord juist is
                alert('Het antwoord is GOED.');
 
 				// Update de score van de gebruiker	
				var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = ? AND rowid = ?', deelnemersGroepID, deelnemersCafe1);
				var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
				db.execute('UPDATE deelnemers SET score= score+1 WHERE deelnemerID = ?', deelnemerDeelnemerID);
	
                vraagMeerkeuze.remove(titel);    
                vraagMeerkeuze.remove(vraagTonen);
                vraagMeerkeuze.remove(brandView);
 				db.close();
                vraagToevoegen();
 				
                
            } else if (e.source.tagsID === 0) {
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                // Checken in welke deelnemersgroep we zitten
                var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
                var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
                db.execute('UPDATE deelnemersgroep SET cafe1= cafe1+1 WHERE groepID = ?', deelnemersGroepID);
 
                alert('Het antwoord is fout.');
                vraagMeerkeuze.remove(titel);    
                vraagMeerkeuze.remove(vraagTonen);
                vraagMeerkeuze.remove(brandView);
 				db.close();
                vraagToevoegen();
                
            } 
        });
        return;
    }
	
	
	
	vraagToevoegen();