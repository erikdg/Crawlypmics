/*
 * Crawlympics
 * Hogeschool van Amsterdam
 * Communication and Multimedia Design
 * I.o.v. Amsterdam Museum
 */



// Database aanroepen
var db = Ti.Database.install('quiz2.sqlite','crawlympics');

Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow({
  exitOnClose: true,
  layout: 'vertical'
});


var btnSubmit = Ti.UI.createButton({
	title:'Start het spel',
	top:130,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

win.add(btnSubmit);


win.open();