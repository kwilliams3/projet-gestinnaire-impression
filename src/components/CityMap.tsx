import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet avec Vite
const fixLeafletIcons = () => {
  const iconRetinaUrl = '/node_modules/leaflet/dist/images/marker-icon-2x.png';
  const iconUrl = '/node_modules/leaflet/dist/images/marker-icon.png';
  const shadowUrl = '/node_modules/leaflet/dist/images/marker-shadow.png';

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface CityMapProps {
  city: string;
}

const CityMap: React.FC<CityMapProps> = ({ city }) => {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Coordonnées de Douala
  const position = { lat: 4.0511, lng: 9.7679 };
  
  // Points de livraison simulés
  const deliveryPoints = [
    { id: 1, position: [4.0611, 9.7779], address: "Bonanjo, Rue Joffre", status: "delivered" },
    { id: 2, position: [4.0411, 9.7579], address: "Akwa, Boulevard de la Liberté", status: "in-transit" },
    { id: 3, position: [4.0711, 9.7879], address: "Deïdo, Rue du Marché", status: "pending" }
  ];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {deliveryPoints.map(point => (
        <Marker 
          key={point.id} 
          position={[point.position[0], point.position[1]] as L.LatLngExpression}
        >
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Livraison #{point.id}</h4>
              <p style={{ marginBottom: '4px' }}>{point.address}</p>
              <p style={{ 
                color: point.status === 'delivered' ? '#10B981' :
                      point.status === 'in-transit' ? '#F59E0B' : '#3B82F6',
                fontSize: '0.75rem'
              }}>
                {point.status === 'delivered' ? 'Livré' :
                 point.status === 'in-transit' ? 'En transit' : 'En attente'}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CityMap;