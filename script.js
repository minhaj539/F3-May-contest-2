
let long, lat;
const apiKey="94faf0bd18e54401aefdf91be64aa777";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}



function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;
  lat=position.coords.latitude;
  long=position.coords.longitude
  showTime(lat,long,1);
}
getLocation();

let container1,container2;
async function showTime(lat,long,id){
    
    let container=document.getElementById("container"+id);
    container.style.display="block";
    container.innerHTML=""
    let res=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`);
    let json=await res.json();
    let result=json.results[0];
    // console.log(container1);
    let name=document.createElement("p")
    name.innerText="Name Of Time Zone : "+result.timezone.name;
    container.appendChild(name);

    let lati=document.createElement("p")
    lati.innerText+=" Lat : "+lat;
      container.appendChild(lati);

    let longi=document.createElement("p");
    longi.innerText+=" Long : "+long
    container.appendChild(longi);

    let std=document.createElement("p")
        std.innerText+="Offset STD : "+result.timezone.offset_STD
        container.appendChild(std);

    let std_s=document.createElement("p")
     std_s.innerText+="Offset STD Seconds : "+result.timezone.offset_STD_seconds
      container.appendChild(std_s);

    let dst=document.createElement("p")
    dst.innerText+="Offset DST : "+result.timezone.offset_DST
    container.appendChild(dst);

    let dst_s=document.createElement("p")
    dst_s.innerText+="Offset DST Seconds : "+result.timezone.offset_DST_seconds
    container.appendChild(dst_s);

    let country=document.createElement("p")
    country.innerText+="Country : "+result.country;
   container.appendChild(country);   // console.log(coun);

    let postcode=document.createElement("p")
    postcode.innerText+="Postcode : "+result.postcode
    container.appendChild(postcode);

    let city=document.createElement("p")
   city.innerText+="City : "+result.city;
    container.appendChild(city); // let offset_std=result. 

}



document.getElementById("btn").addEventListener("click",(e)=>{
    e.preventDefault();
    const address = document.getElementById("search").value;
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`)
.then(resp => resp.json())
.then((geocodingResult) => {

	// console.log(geocodingResult.features[0].properties.lat);
    lat=geocodingResult.features[0].properties.lat;
    long=geocodingResult.features[0].properties.lon;
    showTime(lat,long,2);
});
})

// let resultContainer=document.getElementById("result-container")
// async function showRes(lat,long){
//     let res=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`)
//     let json=await res.json();
//     let result=json.results[0];
//     console.log(result);


// }