 $(document).ready(function(){

    /* function to get the city and state given the
       latitude and longitude */
    function getLocation(){


    $.getJSON("https://ipinfo.io",function(location){
      $("#location").text("Bemidji, Minnesota");
      $("#location2").text(location.city+", " + location.region);
      console.log("location ",location.dity,location.region);
    });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      const PEEPLAT = 47.4875;
      const PEEPLONG = -94.8858;


      getLocation();

      /* all the data is parsed from the openweathermap.org
         site, using the lat and long as input */
      var str = "https://api.openweathermap.org/data/2.5/weather?lat="+ PEEPLAT + "&lon=" + PEEPLONG +"&APPID=0adedd5f2ad9aced6e02a4c438f532cc"
      $.getJSON(str,function(weather){
            var temp = Number(weather.main.temp);
            temp = (temp - 273.15) * 1.8 + 32;
            temp = Math.round(temp);
            $("#temp").text(temp + ' F');
            var iconval = weather.weather[0].icon;
            $(".icon").html("<p><img id='img1' src='https://openweathermap.org/img/w/"+iconval+".png' alt = 'weather icon' height = '150' width='150'></p>");

        var str = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude + "&lon=" + longitude +"&APPID=0adedd5f2ad9aced6e02a4c438f532cc";
        $.getJSON(str,function(weather){
              var temp2 = Number(weather.main.temp);
              temp2 = (temp2 - 273.15) * 1.8 + 32;
              temp2 = Math.round(temp2);
              $("#temp2").text(temp2 + ' F');
              var iconval = weather.weather[0].icon
              $(".icon").html("<p><img id = 'img2' src='https://openweathermap.org/img/w/"+iconval+".png' alt = 'weather icon' height = '150' width='150'></p>");
              if (temp < temp2){
                $("#visitinfo").after("<div style = 'color:red;font-size:2em;' class='col-xs-12'>Peepmobile loaded, stock your frig!!!!</div>")
              }else {
                $("#visitinfo").after("<div style = 'color:red;font-size:2em;' class='col-xs-12'>Too cold, staying here!!!</div>")
              }
          });
        });
    });

    }
  })
