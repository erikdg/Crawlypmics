/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('kaart.js');

// Database aanroepen
var db = Ti.Database.install('quiz2.sqlite','crawlympics');

var strafregelBedenken = Ti.UI.createWindow({
  backgroundColor: 'blue'
});

var textField = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: '60dp', 
  width: '300dp', 
  height: '290dp',
  hintText:'Bijvoorbeeld: Zing een nummer van Andre Hazes, betaal een rondje of drink je glas in een keer leeg...',
  font: {fontSize: 12}
});

strafregelBedenken.add(textField);


var btnSubmit = Ti.UI.createButton({
    title:'Start de eerste ronde',
    top:'380dp',
    width:'240dp',
    height:'35dp',
 	right:'10dp',
    borderRadius:1,
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

strafregelBedenken.add(btnSubmit);


btnSubmit.addEventListener('click',function(e) {
	if (textField.value != '') {
		var dbData = {
			textField: textField.value
		};
		
		
		// Checken in welke deelnemersgroep we zitten
		var sql = db.execute('SELECT groepID FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var groepID = sql.fieldByName('groepID');
		
		// Kijken in welke ronde we zitten
		var sql = db.execute('SELECT strafregel_ronde1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde1 = sql.fieldByName('strafregel_ronde1');
		var sql = db.execute('SELECT strafregel_ronde2 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde2 = sql.fieldByName('strafregel_ronde2');
		var sql = db.execute('SELECT strafregel_ronde3 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
		var strafregel_ronde3 = sql.fieldByName('strafregel_ronde3');
	
		// Strafregel in db toevoegen bij de juiste ronde
		if (strafregel_ronde1 === null && strafregel_ronde2 === null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde1 = "'+textField.value+'" WHERE groepID =?', groepID);
		} else if (strafregel_ronde1 !== null && strafregel_ronde2 === null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde2 = "'+textField.value+'" WHERE groepID =?', groepID);
		} else if (strafregel_ronde1 !== null && strafregel_ronde2 !== null && strafregel_ronde3 === null) {
			var insertStrafregel = db.execute('UPDATE deelnemersgroep SET strafregel_ronde3 = "'+textField.value+'" WHERE groepID =?', groepID);
		} else {
			alert('Hier gaat iets mis');
		}
		
		// Naar het volgende scherm
		kaart.open();
	};

});
