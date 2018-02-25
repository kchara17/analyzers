var lastid = 0;
var locations = [
{lat: 35.147128, lng: 33.373725},
{lat: 35.146551, lng: 33.373426},
{lat: 35.145927, lng: 33.370304},
{lat: 35.144962, lng: 33.371677},
{lat: 35.146167, lng: 33.366449},
{lat: 35.147448, lng: 33.366320},
{lat: 35.145661, lng: 33.364764}

]

function removeReport(p){
  p.parentElement.parentElement.remove();
}

function showMap(){
  document.getElementById('reports').style.display = "none";
  document.getElementById('statistics').style.display = "none";
  document.getElementById('map').style.display = "block";
}

function showReports(){
  document.getElementById('reports').style.display = "block";
  document.getElementById('statistics').style.display = "none";
  document.getElementById('map').style.display = "none";
}

function readReports(){
  var table = document.getElementById('tablebody');
  var path = '../api/report/readAll.php';
  var xhttp = new XMLHttpRequest();
  table.innerHTML="";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.responseText);
      var rep = result.reports;
      for (var i=0; i<rep.length; i++){
        table.innerHTML += '<tr>\
          <th scope="row">' + rep[i].reportID + '</th>\
          <td>' + rep[i].type + '</td>\
          <td>' + rep[i].binID + '</td>\
          <td>' + rep[i].problem + '</td>\
          <td>' + rep[i].date + '</td>\
          <td>' + rep[i].address + '</td>\
          <td><button type="button" class="btn btn-primary" onclick="removeReport(this)">Done</button></td>\
        </tr>';
        if (i==rep.length-1){
          lastid=rep[i].reportID;
        }
      }
    }
  };
  xhttp.open("GET", path, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function readnewReports(){
  var table = document.getElementById('tablebody');
  var path = '../api/report/readAll.php';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.responseText);
      var rep = result.reports;
      for (var i=0; i<rep.length; i++){
        if (parseInt(rep[i].reportID) > parseInt(lastid)){
          table.innerHTML += '<tr>\
            <th scope="row">' + rep[i].reportID + '</th>\
            <td>' + rep[i].type + '</td>\
            <td>' + rep[i].binID + '</td>\
            <td>' + rep[i].problem + '</td>\
            <td>' + rep[i].date + '</td>\
            <td>' + rep[i].address + '</td>\
            <td><button type="button" class="btn btn-primary" onclick="removeReport(this)>Done</button></td>\
          </tr>';
          lastid = rep[i].reportID;
        }
      }
    }
  };
  xhttp.open("GET", path, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

function initMap() {
  var nicosia = {lat: 35.146868, lng: 33.372147};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: nicosia
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}


$(document).ready(function(){
  readReports();
  setInterval(readnewReports, 1000);
});
