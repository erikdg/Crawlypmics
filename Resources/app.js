/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */

Titanium.include('gebruikersToevoegen.js');

// Database aanroepen
var db = Ti.Database.install('quiz2.sqlite','crawlympics');

Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow({
  exitOnClose: true,
  layout: 'vertical'
});


var btn1 = Ti.UI.createButton({
	title:'SPORT',
	top:130,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

var btn2 = Ti.UI.createButton({
	title:'BINNENSTAD',
	top:30,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(btn1);
win.add(btn2);

btn1.addEventListener('click',function(e) {
	var theData = db.execute('INSERT INTO deelnemersgroep (themaID) VALUES ("1")');
	gebruikersToevoegen.open();
});
btn2.addEventListener('click',function(e) {
	var theData = db.execute('INSERT INTO deelnemersgroep (themaID) VALUES ("2")');
	gebruikersToevoegen.open();
});


win.open();