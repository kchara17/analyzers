var lastid = 0;

function removeReport(p){
  p.parentElement.parentElement.remove();
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

$(document).ready(function(){
  readReports();
  setInterval(readnewReports, 1000);
});
