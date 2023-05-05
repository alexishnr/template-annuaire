function initialize2() {
  var options = {
    types: ["(regions)"],
    componentRestrictions: { country: ["fr", "be"] },
  };
  var e = document.getElementById("autocompleteid3"),
    t = new google.maps.places.Autocomplete(e, options);
  t.addListener("place_changed", function () {
    var e = t.getPlace();
    document.getElementById("place_input2").setAttribute("value", e.name);
    document.getElementById("place_input3").setAttribute("value", e.country);
    console.log(e);
    document.getElementById("searchButton").disabled = false;
  });
}
google.maps.event.addDomListener(window, "load", initialize2);
