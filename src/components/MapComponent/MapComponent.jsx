import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '500px', // Altura do mapa, ajuste se achar necessário
  borderRadius: '8px' 
};

// Coordenadas iniciais do centro do mapa (ex: Centro de São Paulo)
const center = {
  lat: -23.55052,
  lng: -46.633308
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return <div>Carregando Mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Marcadores e outras funcionalidades do mapa entrarão aqui no futuro */}
    </GoogleMap>
  );
}

export default React.memo(MapComponent);