Ti.UI.setBackgroundColor('#000');

Titanium.include('strafregelBedenken.js');
var annotations2;

var straat;
var plaats;
var gebruikerLocatie;
var places;
var currentLongitude;
var currentLatitude;
var map;
var region;

function currentLocationAddRoute(){
	
	var db = Ti.Database.install('quiz3.sqlite','crawlympics');
	
	var selectDeelnemersgroep = db.execute('SELECT groepID, cafe1 FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
	var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
	
	var selectDeelnemers = db.execute('SELECT welkCafe FROM deelnemersgroep WHERE groepID = ?', deelnemersGroepID);
	var ditCafe = selectDeelnemers.fieldByName('welkCafe');
	
	// Tel het aantal deelnemers in de groep
	var selectCafe = db.execute('SELECT cafeID, adres FROM cafe WHERE rowid = ?', ditCafe);
	var cafeAdres = selectCafe.fieldByName('adres');

	db.close()
	// console.log(cafeAdres);
	
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = .25;
Titanium.Geolocation.purpose = "Recieve User Location";

	Titanium.Geolocation.getCurrentPosition( function(e) {
    if (!e.success) {
        alert('Could not retrieve location');
        return;
    }
    //here are users coordinates
    currentLongitude = e.coords.longitude;
    currentLatitude = e.coords.latitude;
 
   Titanium.Geolocation.reverseGeocoder(currentLatitude, currentLongitude, function(evt) {
        //here we will store address information
        if (evt.success) {
            places = evt.places;
            if (places && places.length) {
                straat = places[0].street;
                plaats = places[0].city;
                gebruikerLocatie = straat + " , " + plaats;

            } else {
                address = "No address found";
            }
        }
        
        addRoute({
        map: map,
        region: 'UK',
        start: gebruikerLocatie,
        stop: cafeAdres
    });
    });
   
   
    }); 
	
}

currentLocationAddRoute();
                         
                
function decodeLine(encoded) {
    var len = encoded.length;
    var index = 0;
    var array = [];
    var lat = 0;
    var lng = 0;
 
    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        array.push([lat * 1e-5, lng * 1e-5]);
    }
 
    return array;
}

function addRoute(obj) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function () {
        
        var json = JSON.parse(this.responseText);
        
       	var step = json.routes[0].legs[0].steps;
        var intStep = 0, intSteps = step.length, points = [];
        var decodedPolyline, intPoint = 0, intPoints = 0;
        
        var beginLocatieLat = json.routes[0].legs[0].start_location.lat;
        var beginLocatieLng = json.routes[0].legs[0].start_location.lng;
        var eindLocatieLat = json.routes[0].legs[0].end_location.lat;
        var eindLocatieLng = json.routes[0].legs[0].end_location.lng;
    
     annotations2 = Ti.Map.createAnnotation({
        latitude: eindLocatieLat,
        longitude: eindLocatieLng,
        title: 'Title B',
        subtitle: 'Subtitle B',
        image:'pin.png',
        animate: true,
   });
   
   map.addAnnotation(annotations2);
     
        for (intStep = 0; intStep < intSteps; intStep++) {
            decodedPolyline = decodeLine(step[intStep].polyline.points);
            intPoints = decodedPolyline.length;
            for (intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
                if (decodedPolyline[intPoint] != null) {
                    points.push({
                        latitude: decodedPolyline[intPoint][0],
                        longitude: decodedPolyline[intPoint][1]
                    });
                    
               
                }
            }
            
           
        }
        
 
        var route = {
            name: 'Example Route',
            points: points,
            color: '#c60000',
            width: 4
        };
        obj.map.addRoute(route);    
    };
    xhr.onerror = function (e) {
        Ti.API.info('error', JSON.stringify(e));
    };
    var param = [
        'destination=' + obj.stop,
        'origin=' + obj.start,
        'mode=walking',
        'sensor=false'
        
    ];
    
    if (obj.region) {
        param.region = obj.region;
    }
    xhr.open('GET', 'http://maps.googleapis.com/maps/api/directions/json?' + param.join('&'));
    xhr.send();
}

var kaart = Ti.UI.createWindow({
    backgroundColor: '#fff',
    title: 'Test'
});


function addMap(){
region = {
    latitude: 52.376303,
    longitude: 4.900146,
    latitudeDelta: .01,
    longitudeDelta: .01
};



map = Ti.Map.createView({
    animate: true,
    bottom: 0,
    height: Ti.UI.FILL,
    mapType: Ti.Map.STANDARD_TYPE,
    region: region,
    regionFit: true,
    userLocation: true,
    visible: true,
    width: Ti.UI.FILL
});
kaart.add(map);
}

addMap();

var button = Ti.UI.createButton({
   	    	buttonName : 'refresh kaart',
   	    	title : 'Ik ben er!',
   	    	width : '230dp',
   	    	height : '30dp',
        	top: '10dp'
   		});
    	
kaart.add(button);  
    
    
    button.addEventListener('click',function(e){
     			var db = Ti.Database.install('quiz3.sqlite','crawlympics');
				var selectDeelnemersgroep = db.execute('SELECT groepID, welkCafe FROM deelnemersgroep WHERE deelnemersgroep.groepID = (SELECT MAX(groepID) FROM deelnemersgroep)');
				var deelnemersGroepID = selectDeelnemersgroep.fieldByName('groepID');
				var ditCafe = selectDeelnemersgroep.fieldByName('welkCafe');
        		var insertStrafregel = db.execute('UPDATE deelnemersgroep SET welkCafe= welkCafe+1 WHERE groepID = ?', deelnemersGroepID);
        		kaart.remove(map);	
        		currentLocationAddRoute();
        		addMap();
        		db.close();
        		
        		strafregelBedenken.open();
        		
    });
    
    