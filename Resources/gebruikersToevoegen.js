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
	kaart.open();
});
