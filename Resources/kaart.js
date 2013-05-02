var kaart = Titanium.UI.createWindow();

var annotations1 = Ti.Map.createAnnotation({
        latitude: 52.370216,
        longitude: 4.895168,
        title: 'Title A',
        subtitle: 'Subtitle A',
        animate: true,
        image:'pin.png',
        leftButton: 'google.jpg'
   });
     
var annotations2 = Ti.Map.createAnnotation({
        latitude: 52.361536,
        longitude: 4.907894,
        title: 'Title B',
        subtitle: 'Subtitle B',
        image:'pin.png',
        animate: true,
   });
   
var annotations = [annotations1, annotations2];

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:52.370216, longitude:4.895168, 
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true,
    annotations: annotations
});


kaart.add(mapview);


// points = [
	// {latitude:52.370216,longitude:4.895168},
	// {latitude:52.361536,longitude:4.907894}
// ]

var allPoints = somePoints.concat(someOtherPoints);
var route = {
	name:"Test Route",
	points:allPoints,
	color:"red",
	width:2
};
    mapview.addRoute(route);
