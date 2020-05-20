console.log("hello");

const data =
  "https://api.rootnet.in/covid19-in/stats/latest";
// const lastUpdated = document.querySelector(".last_updated");

fetch(data)
  .then((response) => response.json())
  .then((data) => {
    const obj = Object.values(data.data.summary);
    const regional = Object.values(data.data.regional);
    // const refreshed = data.lastOriginUpdate;
    const refreshedDate = new Date(data.lastOriginUpdate).toLocaleString();
    document.querySelector(".last_updated").textContent = refreshedDate;
    const [
      confirmed,
      discharged,
      deaths,
    ] = obj;
    console.log("confirmed : " + confirmed);
    console.log("discharged : " + discharged);
    console.log("deaths : " + deaths);
    console.log("total : " + (confirmed+discharged+deaths));
    console.log("last updated : "+ refreshedDate);
    if (regional.length > 0) {
      // var arrayOfObjects = Object.values(data.data.regional);
      // var temp = "";
      // for (var i = 0; i < arrayOfObjects.length; i++) {
      //   var object = arrayOfObjects[i];
      //   for (var property in object) {
      //   }

      // }
      var tbl = $("<table/>").attr("id", "mytable");
      $("#div1").append(tbl);
      for (var i = 0; i < regional.length; i++) {
        var tr = "<tr>";
        var td1 = "<td>" + regional[i]["loc"] + "</td>";
        var td2 = "<td>" + regional[i]["totalConfirmed"] + "</td>";

        // var td3 = "<td>" + regional[i]["active"] + "</td>";
        // var td4 = "<td>" + regional[i]["confirmedCasesForeign"] + "</td>";
        var td3 = "<td>" + regional[i]["discharged"] + "</td>";
        var td4 = "<td>" + regional[i]["deaths"] + "</td></tr>";
        $("#mytable").append(tr + td1 + td2 + td3 + td4);
      }


      document.querySelector(
        ".confirmed .number"
      ).textContent = confirmed.toLocaleString();
      document.querySelector(".active .number").textContent = (
        confirmed - discharged
      ).toLocaleString();
      document.querySelector(
        ".recovered .number"
      ).textContent = discharged.toLocaleString();
      document.querySelector(
        ".deceased .number"
      ).textContent = deaths.toLocaleString();
      
    }
  });
