filterSelection("popular")
    function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("column");
        if (c == "popular") c = "";
        for (i = 0; i < x.length; i++) {
            RemoveClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
        }
    }

    function AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
        }
    }

    function RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }

    // var btnContainer = document.getElementById("myBtnContainer");
    // var btns = btnContainer.getElementsByClassName("btn");
    // for (var i = 0; i < btns.length; i++) {
    //     btns[i].addEventListener("click", function () {
    //         var current = document.getElementsByClassName("active");
    //         current[0].className = current[0].className.replace(" active", "");
    //         this.className += " active";
    //     });
    // }
    

// ------------------------------------------------------------------->


var mybutton = document.getElementById("mybtn");
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    }
    else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
} 

// ------------------------------------------


// if(!navigator.geolocation){
//     throw new Error ("no geo location available");
// }


// function success(pos) {

//     const lat = pos.coords.latitude;
//     const lng = pos.coords.longitude;

//     const markup = '<a href="http://www.openstreetmap.org/#map=16/${lat}/${lng}">Your current location : latitude: ${lat}, longitude: ${lng} </a>';

//     document.getElementById('loc-output').innerHTML = markup;


//     console.log(pos);
// }

// function error() {

// }

// function options() {

// }


// navigator.geolocation.watchPosition(success, error, options);

// -------------------------------

let locationButton = document.getElementById("get-location");

let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () =>{

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, checkError);
    }
    else{
        locationDiv.innerHTML = "The browser does not support geolocation";
    }
});

const checkError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locationDiv.innerText = "Please allow access to location";
        break;
      case error.POSITION_UNAVAILABLE:

      locationDiv.innerText = "Location Information unavailable";
        break;
      case error.TIMEOUT:
        locationDiv.innerText = "The request to get user location timed out";
    }
  };


const showLocation = async (position) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );

    let data = await response.json();
    locationDiv.innerText = `${data.address.city},${data.address.state},${data.address.country}`;
  };