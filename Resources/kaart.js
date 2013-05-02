var kaart = Titanium.UI.createWindow();

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:52.370216, longitude:4.895168, 
            latitudeDelta:0.005, longitudeDelta:0.005},
    animate:true,
    regionFit:true,
    userLocation:true
});

kaart.add(mapview);