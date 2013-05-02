/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('kaart.js');

// Database aanroepen
var db = Ti.Database.install('quiz2.sqlite','crawlympics');

var gebruikersToevoegen = Ti.UI.createWindow({
  backgroundColor: 'blue'
});

var deelnemer_naam_1 = Ti.UI.createTextField({
    color:'#336699',
 	top:'60dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam eerste deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_1);

var deelnemer_naam_2 = Ti.UI.createTextField({
    color:'#336699',
    top:'110dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam tweede deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_2);

var deelnemer_naam_3 = Ti.UI.createTextField({
    color:'#336699',
    top:'160dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam derde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_3);

var deelnemer_naam_4 = Ti.UI.createTextField({
    color:'#336699',
    top:'210dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam vierde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});


var deelnemer_naam_5 = Ti.UI.createTextField({
    color:'#336699',
    top:'260dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Naam vijfde deelnemer...',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});



var btnAdd = Ti.UI.createButton({
    title:'+',
    top:'310dp',
 	left:'10dp',
    width:'50dp',
    height:'35dp',
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
gebruikersToevoegen.add(btnAdd);





var aantal = 3;

btnAdd.addEventListener('click',function(e) {
	if (aantal == 3) {
		gebruikersToevoegen.add(deelnemer_naam_4);
		aantal++;
	} else if (aantal == 4) {
		gebruikersToevoegen.add(deelnemer_naam_5);
		aantal++;
	} else if (aantal == 5) {
		alert("Helaas kunnen er maar maximaal 5 speler mee doen. Je zou teams kunnen maken.");
	};
});



var btnSubmit = Ti.UI.createButton({
    title:'Start het spel',
    top:'360dp',
    width:'190dp',
    height:'35dp',
 	right:'10dp',
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

gebruikersToevoegen.add(btnSubmit);


btnSubmit.addEventListener('click',function(e) {
	if (deelnemer_naam_1.value != '') {
		var dbData = {
			deelnemer_naam_1: deelnemer_naam_1.value
		};
		var sql = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var groepID = sql.fieldByName('groepID');
		console.log(groepID);
		var insertNaam1 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_1.value+'", 0, ?)', groepID);
		var insertNaam2 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_2.value+'", 0, ?)', groepID);
		var insertNaam3 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_3.value+'", 0, ?)', groepID);
		if (aantal == 4) {
			var insertNaam4 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_4.value+'", 0, ?)', groepID);
		} else if (aantal == 5) {
			var insertNaam4 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_4.value+'", 0, ?)', groepID);
			var insertNaam5 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_5.value+'", 0, ?)', groepID);
		} 
		
		kaart.open();
	};


});
