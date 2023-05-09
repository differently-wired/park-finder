import { TOMTOM_DEV_KEY } from "@env";

export const MapTemplate = (userLocation, carLocation, tracking, imgUri) => {
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

        .marker-border {
            background: #c30b82;
            border-radius: 50%;
            height: 50px;
            width: 50px;
        }

        .marker-icon {
            background-position: center;
            background-size: 45px 45px;
            border-radius: 50%;
            position: absolute;
            left: 2.5px;
            top: 2.5px;
            height: 45px;
            width: 45px;
        }
      </style>

      <div id='map' class='map'></div>

      <!-- load TomTom Maps Web SDK from CDN -->
      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>
      <script src="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.18.0/services/services-web.min.js"></script>

      <script>
        // set the center to be device user location
        let userCoords = [${userLocation.longitude}, ${userLocation.latitude}]
        let carCoords = [${carLocation.longitude}, ${carLocation.latitude}];
        let routeCoords = '${userLocation.longitude},${userLocation.latitude}:${carLocation.longitude},${carLocation.latitude}'

        // set the marker size
        let size = 50

        // create map of area centered on current user location
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        const map = tt.map({
          key:'${TOMTOM_DEV_KEY}',
          container: 'map',
          center: userCoords,
          zoom: 17
        });

        // Add marker when map loads
        map.on('load', function() {
          // user marker
          let userMarkerDiv = document.createElement('div')
          userMarkerDiv.innerHTML = '<p> Hello there! Im a user </p>'

          let userMarkerPopup = new tt.Popup({
            closeButton: false,
            offset: size,
            anchor: 'bottom'
          }).setDOMContent(userMarkerDiv)

          let userMarkerBorder = document.createElement('div')
          userMarkerBorder.className = 'marker-border'
          let userMarkerIcon = document.createElement('div')
          userMarkerIcon.className = 'marker-icon'
          userMarkerIcon.style.backgroundImage = 'url(https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg)'
          userMarkerBorder.appendChild(userMarkerIcon)

          let userMarker = new tt.Marker({
            element: userMarkerBorder
          })
            .setLngLat(userCoords)
            .setPopup(userMarkerPopup)
          userMarker.addTo(map)

          // car marker
          let carMarkerDiv = document.createElement('div')
          carMarkerDiv.innerHTML = '<img src="${imgUri}" style="width: 30vw; height: 30vw;"/>'

          let carMarkerPopup = new tt.Popup({
            closeButton: false,
            offset: size,
            anchor: 'bottom'
          }).setDOMContent(carMarkerDiv)

          let carMarkerBorder = document.createElement('div')
          carMarkerBorder.className = 'marker-border'
          let carMarkerIcon = document.createElement('div')
          carMarkerIcon.className = 'marker-icon'
          carMarkerIcon.style.backgroundImage = 'url(https://png.pngtree.com/png-clipart/20190516/original/pngtree-car-icon-sign-png-image_3568162.jpg)'
          carMarkerBorder.appendChild(carMarkerIcon)

          if (carCoords) {
          let carMarker = new tt.Marker({
            element: carMarkerBorder
          })
            .setLngLat(carCoords)
            .setPopup(carMarkerPopup)
          carMarker.addTo(map)
        }


          //Add route to map
          if (${tracking}) {
            let route = new tt.services.calculateRoute({
              key: '${TOMTOM_DEV_KEY}',
              locations: routeCoords,
            }).then((routeData) => {
              const geojson = routeData.toGeoJson()
              map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                  type: 'geojson',
                  data: geojson
                },
                'paint': {
                  'line-color': 'purple',
                  'line-width': 6
                }
              })
            })
          }

        });
        
      </script>
    </div>
  `;
};
