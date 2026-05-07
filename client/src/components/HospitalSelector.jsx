import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { getNearbyHospitals } from '../api/hospitalApi';
import NearbyHospitalCard from './NearbyHospitalCard';

const HospitalSelector = ({ suggestedDepartment, priorityLevel, onSelect }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationFound, setLocationFound] = useState(false);

  const fetchNearby = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocationFound(true);
          
          const data = await getNearbyHospitals(lat, lng, suggestedDepartment, priorityLevel);
          setHospitals(data);
        } catch (err) {
          setError("Failed to fetch nearby hospitals. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Location access denied. Using default center coordinates.");
        // Fallback to default
        getNearbyHospitals(11.6643, 78.1460, suggestedDepartment, priorityLevel).then(data => {
          setHospitals(data);
          setLoading(false);
        }).catch(() => setLoading(false));
      }
    );
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Hospital Selection</h3>
          <p className="text-sm font-medium text-slate-500">Find the best facilities near you.</p>
        </div>
        
        <button 
          type="button" 
          onClick={fetchNearby}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MapPin className="w-4 h-4 mr-2" />}
          {loading ? 'Finding...' : 'Find Nearby Hospitals'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm font-bold mb-4">{error}</p>}

      {!loading && hospitals.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {hospitals.map(hospital => (
            <NearbyHospitalCard 
              key={hospital.hospitalId} 
              hospital={hospital} 
              onSelectHospital={onSelect} 
            />
          ))}
        </motion.div>
      )}
      
      {!loading && hospitals.length === 0 && !error && (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
          <Navigation className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-bold">Click "Find Nearby Hospitals" to see recommendations based on your location and symptoms.</p>
        </div>
      )}
    </div>
  );
};

export default HospitalSelector;
