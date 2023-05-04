import { TOMTOM_DEV_KEY } from "@env";

export const MapTemplate = (location, marker) => {
  const { longitude, latitude } = location;
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

      <script>
        // set the center to be device location
        let center = [${longitude}, ${latitude}]

        // set the marker size
        let size = 50

        // create map of area centered on current location
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        const map = tt.map({
          key:'${TOMTOM_DEV_KEY}',
          container: 'map',
          center: center,
          zoom: 17
        });

        // Add marker when map loads
        map.on('load', function() {
          // custom style for marker
          let div = document.createElement('div')
          div.innerHTML = '<p> Hello there! </p>'

          let popup = new tt.Popup({
            closeButton: false,
            offset: size,
            anchor: 'bottom'
          }).setDOMContent(div)

          let border = document.createElement('div')
          border.className = 'marker-border'
          let icon = document.createElement('div')
          icon.className = 'marker-icon'
          icon.style.backgroundImage = 'url(https://png.pngtree.com/png-clipart/20190516/original/pngtree-car-icon-sign-png-image_3568162.jpg)'
          border.appendChild(icon)

          let marker = new tt.Marker({
            element: border
          })
            .setLngLat(center)
            .setPopup(popup)
          marker.addTo(map)
        });
        
      </script>
    </div>
  `;
};
