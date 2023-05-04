import { TOMTOM_DEV_KEY } from "@env";

export const MapTemplate = (location) => {
  // Make sure that location is an object with latitude and longitude properties
  // if (!location || typeof location !== "object" || !location.latitude || !location.longitude) {
  //     return "Invalid location";
  // }

  const { longitude, latitude } = location
  console.log(longitude, latitude)


  return `
    <div>
      <style>
        html, body {
          margin: 0;
        }

        #map {
          height: 100%;
          width: 100%;
        }
      </style>

      <div id='map' class='map'></div>

      <!-- load TomTom Maps Web SDK from CDN -->
      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

      <script>
        // create the map
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        let map = tt.map({
          key:'${TOMTOM_DEV_KEY}',
          container: 'map',
          center: [${longitude}, ${latitude}],
          zoom: 17
        });
        map.setMyLocationEnabled(true);

        map.on('dragend', function() {
          let center = map.getCenter();
          window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
        })

      </script>
    </div>
  `;
}