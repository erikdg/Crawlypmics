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
<<<<<<< HEAD
	if (deelnemer_naam.value != '') {
		var dbData = {
			deelnemer_naam: deelnemer_naam.value
		};
		var sql = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var groepID = sql.fieldByName('groepID');
		console.log(groepID);
		var theData = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam.value+'", 0, ?)', groepID);
		// var theData = db.execute('INSERT INTO deelnemers (groepID) SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		kaart.open();
	};


});
=======
    if (deelnemer_naam.value != '') {
        var dbData = {
            deelnemer_naam: deelnemer_naam.value
        };
        var sql = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
        var groepID = sql.fieldByName('groepID');
        console.log(groepID);
        var theData = db.execute('INSERT INTO deelnemers (naam, score, groepID) VALUES ("'+deelnemer_naam.value+'", 0, ?)', groepID);
        // var theData = db.execute('INSERT INTO deelnemers (groepID) SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
        kaart.open();
    };


});
>>>>>>> laatste versie
