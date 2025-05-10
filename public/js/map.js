mapboxgl.accessToken =mapToken ;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [78.491684, 17.387140], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2 // starting zoom
});
const marker= new mapboxgl.Marker({color:"red"})
.setLngLat(Listing.geometry.coordinates)  //coordinates are:listing.geometry.coordinates
.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${Listing.location}</h4><p>Exact location provided after booking.</p>`
    )
)
.addTo(map);