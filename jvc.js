const map = new mapboxgl.Map({
    container: 'map',
    style: `mapbox://styles/mapbox/${currentTheme === 'dark' ? 'dark-v11' : 'streets-v12'}`,
    center: [3, 47],
    zoom: 4,
    attributionControl: false
  });
  
    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'site',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': [
          'match',
          ['get', 'color'],
          '#ffb703', 
          '#ffb703', 
          '#3a86ff' 
        ],
        'circle-radius': 5,
      }
    });
  
  map.on('click', 'unclustered-point', function(e) {
      let coordinates = e.features[0].geometry.coordinates.slice();
  
      console.log('Coordonnées:', coordinates);
  
      map.once('moveend', function() {
          rotateCameraAroundPoint(coordinates, 0);
      });
  
      map.flyTo({
          center: coordinates,
          zoom: 16,
          pitch: 45,
          speed: 2,
          essential: true,
          curve: 1,
          bearing: 100
      });
  });
  
  function rotateCameraAroundPoint(point, timestamp) {
      map.rotateTo((timestamp / 100) % 360, {
          duration: 0
      });
      map.setCenter(point); 
      requestAnimationFrame((newTimestamp) => rotateCameraAroundPoint(point, newTimestamp));
  }
  
  map.on('click', function(e) {
      console.log('Coordinates:', e.lngLat);
    });