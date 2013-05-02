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
 	top:'20dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Vul hier je naam in',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_1);

var deelnemer_naam_2 = Ti.UI.createTextField({
    color:'#336699',
    top:'80dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Vul hier je naam in',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_2);

var deelnemer_naam_3 = Ti.UI.createTextField({
    color:'#336699',
    top:'150dp',
    // left:'10dp',
    width:'300dp',
    height:'40dp',
    font: { fontSize : '14dp'},
    hintText:'Vul hier je naam in',
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

gebruikersToevoegen.add(deelnemer_naam_3);



var btnSubmit = Ti.UI.createButton({
    title:'Start het spel',
    top:'200dp',
    width:'220dp',
    height:'35dp',
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
		var insertNaam2 = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam_3.value+'", 0, ?)', groepID);
		
		kaart.open();
	};


});
