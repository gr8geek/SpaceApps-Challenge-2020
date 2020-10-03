document.addEventListener('DOMContentLoaded', function() {
    const pre = document.getElementById("pred")
    const set = document.getElementById("sett")
    const preCon = document.getElementById("predict")
    const setCon = document.getElementById("set")
    var x = document.getElementById("info");
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude+
      `<h4>Flood forecast</h4>
      <h5 class="center green"> Safe<h5>
      `
      return position.coords.latitude,position.coords.longitude
    }
    
    pre.addEventListener('click',(event)=>{
        console.log("clicked")
        setCon.classList.add('hide')
        preCon.classList.remove("hide")

    })
    set.addEventListener('click',(event)=>{
        console.log("set")
        setCon.classList.remove("hide")
        preCon.classList.add("hide")

    })
    let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
function handleAlerts(){
    var lst =localStorage.getItem('alerts')
    if(!lst){
        console.log("Creating Var store")
        var lst = Array()
        localStorage.setItem('alerts',JSON.stringify(lst))
        lst = JSON.parse(localStorage.getItem('alerts'))

        console.log(lst)
    }
    console.log("Alert",typeof(lst))
}
function handleInserts(){
    var lst  = JSON.parse(localStorage.getItem('alerts'))
    var Inp = document.getElementById("input").value
    document.getElementById("input").value=""
    lst.push(Inp)
    localStorage.setItem('alerts',JSON.stringify(lst))
    console.log(localStorage.getItem('alerts'))
}
handleAlerts()
function displayList(){
        var item1 = JSON.parse(localStorage.getItem('alerts'))
        console.log()
        var HTMLInner = ""
        var coll = document.getElementsByClassName("collection")[0]
        for (var x in item1){
            HTMLInner+=`
            <li class="collection-item">${item1[x]}
            <i class="right material-icons" id="li${x}">delete</i>

            </li>

    
            `
        }
    coll.innerHTML=HTMLInner
        for (var x in item1){
            var item= document.getElementById("li"+x)
            item.addEventListener('click',(event)=>{
                ar=[]
                const myInd = x
                for(var y in item1){
                    if(x!=y){
                        ar.push(item1[y])
                    }
                }
                localStorage.setItem('alerts',JSON.stringify(ar))
                displayList()
            })
        }
}

var add = document.getElementById("button")
add.addEventListener('click',event=>{
    console.log("Clickedz")
    event.preventDefault()
    handleInserts()
    displayList()
})

initMap()
getLocation()

    displayList()


  });


  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

