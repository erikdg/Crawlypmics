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


var deelnemer_naam = Ti.UI.createTextField({
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

gebruikersToevoegen.add(deelnemer_naam);


var btnSubmit = Ti.UI.createButton({
	title:'Start het spel',
	top:130,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

gebruikersToevoegen.add(btnSubmit);


btnSubmit.addEventListener('click',function(e) {
	if (deelnemer_naam.value != '') {
		var dbData = {
			deelnemer_naam: deelnemer_naam.value
		};
		var theData = db.execute('INSERT INTO deelnemers (naam) VALUES ("'+deelnemer_naam.value+'")');
		kaart.open();
	};


});
