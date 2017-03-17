

      function initMap() {
        var myLatLng = {lat: -25.363,lng:131.044}
        var place, sign1, sign2

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 1,
          center: {lat: -28.024, lng: 140.887},

        });
        //for (peepmarker in locations) {
        //  location = (peepmarker.lat,peepmarker.lng);


        for (var i=0;i<locations.length;i++){
          sign1 = 1;
          sign2 = 1;

          if (Math.random() > .5) {sign1 = -1}
          if (Math.random() > .5) {sign2 = -1}
          place = {lat: Math.random() * 83*sign1,lng:Math.random()*180*sign2}
          console.log(locations[i].title,place.lat,place.lng);
          var marker = new google.maps.Marker({
            position:place,
            map:map,
            title:locations[i].title,
            icon:locations[i].icon,
          });
        }
        /*calculate the number of tumblers to create*/
        var tumblerNbr = Math.floor(Math.random() * 10);
        console.log(tumblerNbr);
        for (var i = 0;i < tumblerNbr;i++){
          sign1 = 1;
          sign2 = 1;
          if (Math.random() > .5) {sign1 = -1}
          if (Math.random() > .5) {sign2 = -1}
          place = {lat: Math.random() * 83*sign1,lng:Math.random()*180*sign2}
          var eggMarker = new google.maps.Marker({
            position:place,
            map:map,
            title:"tumbler",
            label: "T",
            icon:{
            path: google.maps.SymbolPath.CIRCLE,
            scale:6.5,
            fillColor:"#f442eb",
            fillOpacity:0.4,
            strokeWeight:0.4
            }
          })
        }
      }

      var locations = [
        {title:"Tig",icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'},
        {title:"Oliver",icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'},
        {title:"Buffy",icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'},
        {title:"Prudence",icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'},
        {title:"Patti",icon:'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'},
        {title:"Petunia",icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'},
        {title:"Hillary",icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'},
        {title:"Martha",icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'},
        {title:"LaLa",icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'},
        {title:"Prince Sergio",icon:'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'},
        {title:"Princess Isabella",icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'},
        {title:"Andre",icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'},
        {title:"Konrad",icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'},
        {title:"Peter",icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'},
        {title:"George",icon:'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'},
        {title:"Laruence",icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'},
        {title:"Leo",icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'},
        {title:"Draco",icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'},
        {title:"Gertrude",icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'},
      ];
$(document).ready(function(){
    /*have to allow the geolocation, otherwise don't execute code */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      const PEEPLAT = 47.4875;  /* setting from Bemidji Minnesota */
      const PEEPLONG = -94.8858;

      $.getJSON("https://ipinfo.io",function(location){
        $("#location").text("Bemidji, Minnesota");

        /*if not in the US use for weather search */
        if (location.country != "US") {
          location.region = location.country;}
        $("#location2").text(location.city+", "+location.region);

        /*using weather underground for the weather info */
        /*the two hits to weather underground are asynch */
        var str = "https://api.wunderground.com/api/9865d5d1f3370595/conditions/q/Minnesota/Bemidji.json";
        $.getJSON(str,function(weather){
              /*check to make sure valid info returned */
              if (weather.current_observation.temp_f){
                temp = weather.current_observation.temp_f;
                str= weather.current_observation.icon_url;
                var https_str = str.replace("http:","https:");
                $("#temp").text(weather.current_observation.temp_f + ' F');
                $("#icon1").html("<p><img id='img1' src="+https_str+" alt = 'weather icon' height = '150' width='150'></p>");
              }
        });
        var str = "https://api.wunderground.com/api/9865d5d1f3370595/conditions/q/"+location.region+"/"+location.city+".json";
        $.getJSON(str,function(weather){
                /*make sure the api returns valid data, if location not valid returns something else*/
                if (weather.current_observation.temp_f){
                  temp2 = weather.current_observation.temp_f;
                  str = weather.current_observation.icon_url;
                  var https_str2 = str.replace("http:","https:");
                  $("#temp2").text(weather.current_observation.temp_f + ' F');
                  $("#icon2").html("<p><img id = 'img2' src="+https_str2+" alt = 'weather icon' height = '150' width='150'></p>");
                  if (temp < temp2){
                    $("#visitinfo").after("<p>weather info from api.wunderground.com</p><div style = 'color:red;font-size:2em;' class='col-xs-12'>Peepmobile loaded, stock your frig!!!!</div>")
                  }else {
                    $("#visitinfo").after("<p>weather info from api.wunderground.com</p><div style = 'color:red;font-size:2em;' class='col-xs-12'>Too cold, staying here!!!</div>")
                  }
              }
        });
      });/*ipinfo*/
    });/*navigator */
  } /*if navigator*/
  console.log("before mymap()");
  /* js for the googlemaps for is there a peep near you? */
  function myMap(){
    console.log("we made it here");
    var mapProp = {
      center:new google.maps.LatLng(51.508742,-0.120850),zoom:5,
    };
    var map= new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }
  console.log("after mymap()");
});
