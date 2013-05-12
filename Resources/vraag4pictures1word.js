/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

var vraag4pictures1word = Ti.UI.createWindow({
  backgroundColor: 'blue'
});


	var vraagZelf;
	var fotoVraagTonen;
	var fotoView;

function vraagToevoegenTwee() {
	

	// Database aanroepen
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	// Checken in welke deelnemersgroep we zitten
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
	
	// Tel het aantal deelnemers in de groep
	var selectAantalDeelnemers = db.execute('SELECT count(groepID) FROM deelnemers WHERE groepID = ?', deelnemersGroepID);
	var aantalDeelnemers = selectAantalDeelnemers.fieldByName('count(groepID)');
		
	// Lees deelnemers uit de deelnemerstabel
	var selectDeelnemers = db.execute('SELECT deelnemerID, naam FROM deelnemers WHERE groepID = ? AND rowid = ?', deelnemersGroepID, deelnemersCafe1);
	var naam = selectDeelnemers.fieldByName('naam');
	var deelnemerDeelnemerID = selectDeelnemers.fieldByName('deelnemerID');
	
	
	// Haal cafes op bij gekozen thema
	var selectCafe = db.execute("SELECT DISTINCT cafe.cafeID, cafe.cafe_naam, cafe.themaID FROM cafe INNER JOIN deelnemersgroep ON cafe.themaID = deelnemersgroep.themaID WHERE groepID = ? LIMIT 1", deelnemersGroepID);
	var cafeCafeID = selectCafe.fieldByName('cafeID');
	var cafeNaam = selectCafe.fieldByName('cafe_naam');
		
	// Haal vraag random op
	var selectVraag = db.execute("SELECT vraag, vraagID FROM vragen WHERE cafeID=? AND vraag_type=2 ORDER BY RANDOM()", cafeCafeID);
	var vragenVraagID = selectVraag.fieldByName('vraagID');
	var vragenVraag = selectVraag.fieldByName('vraag');
 
	// Haal antwoorden van vraag op
	var selectAntwoorden = db.execute("SELECT antwoord, goedfout FROM antwoorden WHERE vraagID =? ORDER BY RANDOM()", vragenVraagID);
	var antwoordenAntwoord = selectAntwoorden.fieldByName('antwoord');
	var antwoordenGoedfout = selectAntwoorden.fieldByName('goedfout');
	
	// Toon voor wie de vraag is
	vraagZelf = Ti.UI.createLabel({
    	color: 'black',
    	text: 'Deze vraag is voor '+ naam + '',
    	font: { fontSize: 14, fontFamily: 'Helvetica Neue' },
    	right:25,
 		left:25,
 		top:60
	});

	// Toon de vraag
	fotoVraagTonen = Ti.UI.createLabel({
    	color: 'black',
    	text: ''+ vragenVraag + '',
    	font: { fontSize: 15, fontFamily: 'Helvetica Neue' },
    	right:25,
 		left:25,
 		top:90
	});
	
	// Toon de antwoorden
	// Primary view voor de buttons
	fotoView = Ti.UI.createView({
   		title : 'Hello',
    	width : '100%',
   		height : '100%',
   		
    	top: '140dp',
    	layout: 'horizontal'
	});
	

	var count=0;
	// fetch rows
	while (selectAntwoorden.isValidRow()) {
		
		if(count==0) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '12dp',
        		left: '10dp'
			});
		}
		
		if(count==1) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '10dp',
        		left: '12dp'
			});
		}
		if(count==2) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		width : '140dp',
   	    		height : '140dp',
        		top: '10dp',
        		left: '12dp'
			});
		}
		if(count==3) {
   		//create Button with name and title
   			var myButton = Ti.UI.createButton({
		  		backgroundImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		backgroundSelectedImage: '/images/'+selectAntwoorden.fieldByName('antwoord')+'',
		  		buttonName : selectAntwoorden.fieldByName('antwoord'),
   	    		tagsID : selectAntwoorden.fieldByName('goedfout'),
   	    		width : '40dp',
   	    		height : '40dp',
        		top: '10dp',
        		right: '10dp'
			});
		}
    	addlistenerTwee(myButton);
    
    	// Button toevoegen aan de view
		fotoView.add(myButton);
 		count++;
 
    	// get next row
  		selectAntwoorden.next();
    	
	}

	// always close rowset and db connection!
	selectAntwoorden.close();
	
	
	

	if (deelnemersCafe1 < aantalDeelnemers +1) {
		
		vraag4pictures1word.add(fotoView);
		vraag4pictures1word.add(fotoVraagTonen);
		vraag4pictures1word.add(vraagZelf);
	} else {		
       	db.execute('UPDATE deelnemersgroep SET cafe1=1 WHERE groepID = ?', deelnemersGroepID);
 		db.close();
		alert('Doeeeeg. Hier moet de volgende pagina worden geopend!');
	}
	db.close();
};
	
	

	vraagToevoegenTwee();
	

	function addlistenerTwee(inobj) {
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
	
                vraag4pictures1word.remove(vraagZelf);    
                vraag4pictures1word.remove(vraagTonen);
                vraag4pictures1word.remove(fotoView);
 				db.close();
                vraagToevoegenTwee();
 				
                
            } else if (e.source.tagsID === 0) {
                var db = Ti.Database.install('quiz3.sqlite','crawlympics');
                // Checken in welke deelnemersgroep we zitten
                var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
                var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
                var deelnemersCafe1 = selectDeelnemersgroep.fieldByName('cafe1');
                db.execute('UPDATE deelnemersgroep SET cafe1= cafe1+1 WHERE groepID = ?', deelnemersGroepID);
 
                alert('Het antwoord is fout.');
                vraag4pictures1word.remove(vraagZelf);    
                vraag4pictures1word.remove(fotoVraagTonen);
                vraag4pictures1word.remove(fotoView);
 				db.close();
                vraagToevoegenTwee();
                
            } 
        });
        return;
    }
	
	
	
	