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

var picker = Ti.UI.createPicker({
  top:50
});

var thema = [];
thema[0]=Ti.UI.createPickerRow({title:'Sport'});
thema[1]=Ti.UI.createPickerRow({title:'Binnenstad'});
picker.add(thema);
picker.selectionIndicator = true;

win.add(picker);
win.open();

// must be after picker has been displayed
picker.setSelectedRow(0, 2, false); // select Mangos






var btn = Ti.UI.createButton({
	title:'Start de Quiz',
	top:130,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

win.add(btn);

btn.addEventListener('click',function(e) {
	if (thema.value != 'c') {
		var dbData = {
			themaID: thema.value
		};
		insertRows(dbData);
	};


});






function insertRows(dbData) {
	
	var db = Ti.Database.install('quiz2.sqlite','crawlympics');
	var theData = db.execute('INSERT INTO deelnemersgroep (themaID) VALUES ("'+thema.value+'")');
	db.close();
	
};
