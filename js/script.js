console.log('summer');

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
    name: 'Breaker Bay',
    id  : 104,
    address: 'Benoit Trail, Seatoun, Wellington 6022',
    location: 'Wellington',
    latitude : -41.3257794,
    longitude : 174.8344088,
    distance: 8.7,
    duration  : 18
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


// by default, hide the map
$('#map').hide();



$(document).ready(function(){
  $('#mapBtn').click(function(){
    $('#map').show();
    var place = document.getElementById('place').value;
    var duration = document.getElementById('duration').value;
    console.log(place,duration);
    // initMap(place,duration);
  });

});


//dynamically creating the script elements and
//giving src attribute the google plug in with key from external JSON
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + myKey[0].key + '&callback=initMap'
document.getElementsByTagName('body')[0].appendChild(script);


function initMap() {
   var center = {lat:beaches[0].latitude, lng:beaches[0].longitude};//Scorching Bay Beach - first in objects array
   var map = new google.maps.Map(document.getElementById('map'), {
     center: center,
     zoom: 12
   });


    for (let i = 0; i < beaches.length; i++) {
       let marker = new google.maps.Marker({
         position: {lat: beaches[i].latitude, lng: beaches[i].longitude},
         map: map
       });

       var contentString = '<div class="bg-primary h4">'
         + '<h5>' + beaches[i].name + '</h5>'
         + '<h6>' + beaches[i].address + '</h6>'
         + '<h6> Distance from local i-site center: ' + beaches[i].distance + ' km</h6>'
         + '<h6> Duration: ' + beaches[i].duration + ' minutes</h6>'
         + '</div>';

       // let contentString =
       // `<div>
       //     <span id="marker">${beaches[i].name}</span>
       // </div>`
       let infowindow = new google.maps.InfoWindow({ content: contentString });
       // google.maps.event.addListener(marker, 'click', function(marker, i) {
       //     return function(){
       //         infowindow.setContent(restaurants[i].name);
       //         infowindow.open(map, marker);
       // })
       marker.addListener('click', function() {
           infowindow.open(map, marker);
       })
}
} //initMap ENDS



//Initialize and add the map
// function initMap(p,d){
//   console.log(p,d);
//
//   var oldwindow;
//   var center;
//
//
//   if (p === "Wellington"){
//     center = {lat: -41.2911449, lng: 174.7814447};
//   } else if (p === "Auckland"){
//     center = {lat:-36.8485 , lng:174.7633 };
//   }
//
//   // map object
//   var map = new google.maps.Map(
//     document.getElementById('map'), {
//       zoom:6,
//       center: center,
//   }); // end of map objects
//
//     // loop through all the objects in the array locations
//     for(var i=0; i<beaches.length; i++){
//       console.log(p,typeof(p));
//       console.log(beaches[i].location, typeof(beaches[i].location));
//       console.log(beaches[i].duration, typeof(beaches[i].duration));
//       console.log(beaches[i].location === p);
//       console.log(beaches[i].duration <= d);
//
//       if(beaches[i].location === p && beaches[i].duration <=d) {
//         //create content dynamically
//         var content = '<div class="bg-primary h4" id=" ' + beaches[i].id + '">"'
//         + '<h5>' + beaches[i].name + '</h5>'
//         + '<h6>' + beaches[i].address + '</h6>'
//         + '<h6> Distance from local i-site center: ' + beaches[i].distance + ' km</h6>'
//         + '<h6> Duration: ' + beaches[i].duration + ' minutes</h6>'
//         + '</div>';
//
//         //create infowindow
//         var infowindow = new google.maps.InfoWindow({
//           content: content
//         });
//
//         //position to add marker
//         var position = {lat: beaches[i].latitude, lng: beaches[i].longitude};
//
//         //create marker
//         var marker = new google.maps.Marker({
//           position: position,
//           map: map
//         });
//
//         newWindow(marker, infowindow);
//
//         function newWindow(newMarker, newInfowindow){
//           newMarker.addListener('click',function(){
//             if(oldwindow){
//               oldwindow.close();
//             }
//             newInfowindow.open(map, newMarker);
//             oldwindow = newInfowindow;
//           });
//         }
//
//       }
//
//     }
//
//
//
// } //initMap ends
