 $(document).ready(function(){

    /* function to get the city and state given the
       latitude and longitude */
    function getLocation(){

//make sure you check for the country
    $.getJSON("https://ipinfo.io",function(location){
      $("#location").text("Bemidji, Minnesota");
      $("#location2").text(location.city+", " + location.region);
      console.log("location ",location.city,location.region,location.country);
    });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      const PEEPLAT = 47.4875;
      const PEEPLONG = -94.8858;


      //getLocation();
      $.getJSON("https://ipinfo.io",function(location){
        $("#location").text("Bemidji, Minnesota");
        $("#location2").text(location.city+", "+location.region);

      /* all the data is parsed from the openweathermap.org
         site, using the lat and long as input */

      var str = "https://api.wunderground.com/api/9865d5d1f3370595/conditions/q/Minnesota/Bemidji.json";
      $.getJSON(str,function(weather){
            console.log("point 1",weather.current_observation.temp_f);
            console.log("point 2 ",weather.current_observation.icon_url);
            temp = weather.current_observation.temp_f;
            $("#temp").text(weather.current_observation.temp_f + ' F');
            $("#icon1").html("<p><img id='img1' src="+weather.current_observation.icon_url+" alt = 'weather icon' height = '150' width='150'></p>");

        var str = "https://api.wunderground.com/api/9865d5d1f3370595/conditions/q/"+location.region+"/"+location.city+".json";
        $.getJSON(str,function(weather){
              temp2 = weather.current_observation.temp_f
              $("#temp2").text(weather.current_observation.temp_f);
              $("#icon2").html("<p><img id = 'img2' src="+weather.current_observation.icon_url+" alt = 'weather icon' height = '150' width='150'></p>");
              if (temp < temp2){
                $("#visitinfo").after("<div style = 'color:red;font-size:2em;' class='col-xs-12'>Peepmobile loaded, stock your frig!!!!</div>")
              }else {
                $("#visitinfo").after("<div style = 'color:red;font-size:2em;' class='col-xs-12'>Too cold, staying here!!!</div>")
              }
          });
        });
    });
});
    }
  })
