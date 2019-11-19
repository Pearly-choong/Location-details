console.log('summer');

// by default, hide the map
$('#map').hide();



$(document).ready(function(){
  $('#mapBtn').click(function(){
    $('#map').show();
    var location = document.getElementById('location').value;
    var duration = document.getElementById('duration').value;
    console.log(location,duration);
     initMap(location,duration);
  });

});



// date calculation
// validate user entry
$('#startDate').datepicker({
  dateFormat : 'yy-mm-dd',
  changeMonth : true,
  minDate : new Date(),
  maxDate : '+1y',
  onSelect : function(date){
    var selectDate = new Date(date);
    //number of miliseconds in a day
    var msecsInADay = 86400000;

    // considering the time of the day when the site is used
    var stDate = new Date(selectDate.getTime() + msecsInADay);

    // Set Minimum date of endDatePicker after selected date of startDate endDatePicker
    $('#endDate').datepicker('option', 'minDate', stDate);
    var enDate = new Date(selectDate.getTime() + 15 * msecsInADay);

    $('#endDate').datepicker('option', 'maxDate', enDate);
  }



});


$('#endDate').datepicker({
  dateFormat : 'yy-mm-dd',
  changeMonth : true
});


function dateDiff(){
  var start = $(startDate).datepicker('getDate');
  var end = $(endDate).datepicker('getDate');
  // conver miliseconds, then to seconds, then to minutes, then to hours and last days
  var days = (end - start)/1000/60/60/24; // user readable format

  document.getElementById('days').value = days;
  return;
}

$('#calcDate').click(function(){
  dateDiff();
});


var beaches = [
  {
    name: 'Scorching Bay Beach',
    id  : 101,
    address: 'Near 61 The Esplanade, Houghton Bay, Wellington 6023',
    location: 'Wellington',
    latitude : -41.3438900,
    longitude : 174.7880464,
    distance: 8.2,
    duration  : 17
  },

  {
    name: 'Princess Bay',
    id  : 102,
    address: 'Wellington',
    location: 'Wellington',
    latitude : -41.3439746,
    longitude : 174.7879392,
    distance: 8.2,
    duration  : 16
  },

  {
    name: 'Freyberg Beach',
    id  : 103,
    address: 'Near New, Oriental Bay Beach',
    location: 'Wellington',
    latitude : -41.2910117,
    longitude : 174.7930659,
    distance: 1.5,
    duration  : 4
  },

  {
    name: 'Queenstown Bay Beach',
    id  : 104,
    address: 'Queesnstown 9300',
    location: 'Queenstown',
    latitude : -44.770382,
    longitude : 168.689637,
    distance: 0.5,
    duration  : 6
  },

  {
    name: 'Lyall Bay Surf Beach',
    id  : 105,
    address: '61 The Esplanade, Houghton Bay, Wellington 6023',
    location: 'Wellington',
    latitude : -41.340004,
    longitude : 174.785064,
    distance: 7.8,
    duration  : 17
    },

  {
    name: 'Herne Bay Beach',
    id  : 106,
    address: 'Herne Bay Rd, Herne Bay, Auckland 1011',
    location: 'Auckland',
    latitude : -36.843390,
    longitude : 174.727493,
    distance: 3.8,
    duration  : 11
    },

  {
    name: 'Mairangi Bay Beach',
    id  : 107,
    address: 'Montrose Terrace, Mairangi Bay, Auckland 0630',
    location: 'Auckland',
    latitude : -36.738310,
    longitude : 174.756502,
    distance: 15.8,
    duration  : 22
    },

  {
    name: 'Pohutukawa Bay Beach',
    id  : 108,
    address: 'Okura, Auckland 0792',
    location: 'Auckland',
    latitude : -36.663991,
    longitude : 174.746455,
    distance: 25,
    duration  : 33
    },

]






// access API key from config.json
var myKey = JSON.parse(apiKey);
console.log(myKey[0].key);




//dynamically creating the script elements and
//giving src attribute the google plug in with key from external JSON
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + myKey[0].key
document.getElementsByTagName('body')[0].appendChild(script);


function initMap(l,d) {
  console.log(l,d);

//   var center = {lat:beaches[0].latitude, lng:beaches[0].longitude};//Scorching Bay Beach - first in objects array
    var center;
    var oldwindow;

    if (l === "Wellington") {
      center = {lat: -41.2911449, lng: 174.7814447};
    } else if (l === "Auckland") {
      center = {lat:-36.8485 , lng:174.7633};
    } else if (l === "Queenstown") {
      center = {lat:-45.0312 , lng:168.6626};
    }
    console.log(l);

   var map = new google.maps.Map(document.getElementById('map'), {
     center: center,
     zoom: 12,
     mapTypeId: 'roadmap',
     styles:[
       {
       featureType : 'water',
       stylers: [
            {
           color: '#48dbfb'
            }]
        },
        {
        featureType : 'road',
        elementType : 'geometry',
        stylers: [
             {
            lightness: '-40'
             }]
         },
         {
         featureType : 'road',
         elementType : 'labels.text.fill',
         stylers: [
              {
             color: '#34495e'
              }]
          },
          {
          featureType : 'landscape',
          stylers: [
               {
              color: '#2ecc71'
               }]
           },
      ]
   }); //end of map objects


    for (var i = 0; i < beaches.length; i++) {
    console.log(l,typeof(l), d, typeof(d));
    console.log(beaches[i].location, typeof(beaches[i].location));
    console.log(beaches[i].duration, typeof(beaches[i].duration));
    console.log(beaches[i].location === l);
    console.log(beaches[i].duration <= d);

       if ((beaches[i].location === l) && (beaches[i].duration <= d)){
         // create content dynamically
         var contentString = '<div class="h4" id=" ' + beaches[i].id + '">'
           + '<h5>' + beaches[i].name + '</h5>'
           + '<h6>' + beaches[i].address + '</h6>'
           + '<h6> Distance from local i-site center: ' + beaches[i].distance + ' km</h6>'
           + '<h6> Duration: ' + beaches[i].duration + ' minutes</h6>'
           + '</div>';
       }


       // create infowindow
     var infowindow = new google.maps.InfoWindow({ content: contentString });


      // position to add marker
      var position = {lat: beaches[i].latitude, lng: beaches[i].longitude};

      // create marker
       var myIcon = 'http://maps.google.com/mapfiles/kml/shapes/water.png';
       var marker =  new google.maps.Marker({
         position: position,
         map: map,
         icon : myIcon
       });

       newWindow(marker, infowindow);

       function newWindow(newMarker, newInfowindow){

         newMarker.addListener('click', function() {
           if( oldwindow){
             oldwindow.close();
           }
           newInfowindow.open(map, newMarker);
           oldwindow = newInfowindow;
         }); // end of addListener

       } // end of newWindow function


    } // end of for

} //initMap ENDS




// USE LET METHOD: ===============

// function initMap() {
//   console.log();
//
//    var center = {lat:beaches[0].latitude, lng:beaches[0].longitude};//Scorching Bay Beach - first in objects array
//    var map = new google.maps.Map(document.getElementById('map'), {
//      center: center,
//      zoom: 12
//    });
//
//
//     for (let i = 0; i < beaches.length; i++) {
//        let marker = new google.maps.Marker({
//          position: {lat: beaches[i].latitude, lng: beaches[i].longitude},
//          map: map
//        });
//
//        var contentString = '<div class="h4">'
//          + '<h5>' + beaches[i].name + '</h5>'
//          + '<h6>' + beaches[i].address + '</h6>'
//          + '<h6> Distance from local i-site center: ' + beaches[i].distance + ' km</h6>'
//          + '<h6> Duration: ' + beaches[i].duration + ' minutes</h6>'
//          + '</div>';
//
//
//        let infowindow = new google.maps.InfoWindow({ content: contentString });
//
//        marker.addListener('click', function() {
//            infowindow.open(map, marker);
//        })
// }
// } //initMap ENDS
