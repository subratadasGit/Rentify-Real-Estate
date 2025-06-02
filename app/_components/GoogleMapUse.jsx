import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '20px',
};

function GoogleMapUse({ coordinates }) {
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  useEffect(() => {
    coordinates && setCenter(coordinates);
  }, [coordinates]);

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px' }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
}

export default GoogleMapUse